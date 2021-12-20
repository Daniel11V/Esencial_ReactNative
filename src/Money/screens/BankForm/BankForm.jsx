import {
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { addAccount, addBank } from "../../../../store/actions/bank.action";

import { COLORS } from "../../../../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { STYLES } from "../../../../constants/styles";
import {
	CURRENCIES,
	ACCOUNTS_CATEGORIES,
	BANKS_INFO,
} from "../../../../constants/bankConstants";

export const BankForm = ({ route, navigation }) => {
	const { insideBank, isNewCurrency } = route.params;

	const dispatch = useDispatch();
	const bank = useSelector((state) => state.money.banks[insideBank]);
	const possibleBanks = useSelector((state) =>
		BANKS_INFO.filter(
			(bank) =>
				Object.keys(state.money.banks).indexOf(bank.name) === -1 &&
				bank.name !== "Default"
		)
	);

	const [name, setName] = useState(isNewCurrency ? bank.name : "");
	const [otherName, setOtherName] = useState("");
	const [currency, setCurrency] = useState("");
	const [otherCurrency, setOtherCurrency] = useState("");
	const [ammount, setAmmount] = useState(null);
	const [category, setCategory] = useState("");

	const [incomplete, setIncomplete] = useState({
		name: false,
		currency: false,
	});
	const possibleCurrencies = isNewCurrency
		? CURRENCIES.filter(
				(curr) =>
					!Object.values(bank.accounts).some(
						(account) => account.currency == curr.name
					)
		  )
		: [...CURRENCIES];

	const pickerName = useRef();
	const pickerCurrency = useRef();
	const pickerCategory = useRef();

	const onAdd = () => {
		Keyboard.dismiss();

		if (name && currency) {
			const newName = name === "Otra" ? otherName : name;

			const newCurrency =
				currency == "Otra"
					? otherCurrency.toUpperCase()
					: currency.toUpperCase();

			if (isNewCurrency) {
				dispatch(
					addAccount(bank.name, {
						currency: newCurrency,
						ammount: ammount ? Number(ammount) : 0,
						category: category.length ? category : "uso diario",
						creationDate: Date.now(),
					})
				);
				navigation.navigate("BankDetails", {
					bankName: insideBank,
					hasNewCurrency: newCurrency,
				});
			} else {
				dispatch(
					addBank({
						name: newName,
						creationDate: Date.now(),
						accounts: {
							[newCurrency]: {
								ammount: ammount ? Number(ammount) : 0,
								currency: newCurrency,
								category: category.length ? category : "uso diario",
								creationDate: Date.now(),
							},
						},
					})
				);
				navigation.goBack();
			}
		} else {
			setIncomplete({
				name: !(name.length > 0),
				currency: !(currency.length > 0),
			});
		}
	};

	return (
		<SafeAreaView
			style={{ ...STYLES.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<ScrollView
				style={{ height: "100%" }}
				keyboardShouldPersistTaps="handled"
			>
				{isNewCurrency ? (
					<Text style={{ ...STYLES.textInput, marginTop: 40 }}>{name}</Text>
				) : (
					<Pressable
						style={STYLES.pickerInput}
						onPress={() => pickerName.current.focus()}
					>
						<Picker
							selectedValue={name}
							onValueChange={(text) => setName(text)}
							ref={pickerName}
							mode="dropdown"
						>
							<Picker.Item
								label="Nombre de cuenta*"
								value=""
								style={{ ...STYLES.bigText, color: COLORS.lightGray }}
							/>
							{possibleBanks.map((pBank, key) => (
								<Picker.Item
									key={key}
									label={pBank.name}
									value={pBank.name}
									style={STYLES.bigText}
								/>
							))}
							<Picker.Item
								label="Otra..."
								value="Otra"
								style={STYLES.bigText}
							/>
						</Picker>
					</Pressable>
				)}
				{name == "Otra" && (
					<TextInput
						placeholder="Nombre de cuenta*"
						style={{ ...STYLES.textInput, marginTop: 40 }}
						maxLength={20}
						selectionColor={COLORS.primary}
						value={otherName}
						onChangeText={(text) => setOtherName(text)}
					/>
				)}

				{incomplete.name && (
					<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
				)}

				<Pressable
					style={STYLES.pickerInput}
					onPress={() => pickerCurrency.current.focus()}
				>
					<Picker
						selectedValue={currency}
						onValueChange={(itemValue) => setCurrency(itemValue)}
						ref={pickerCurrency}
						mode="dropdown"
					>
						<Picker.Item
							label={isNewCurrency ? "Nueva moneda*" : "Tipo de moneda*"}
							value=""
							style={{ color: COLORS.lightGray, fontSize: 20 }}
						/>
						{possibleCurrencies.map((curr, key) => (
							<Picker.Item
								key={key}
								label={curr.name}
								value={curr.name}
								style={STYLES.bigText}
							/>
						))}
						<Picker.Item label="Otra..." value="Otra" style={STYLES.bigText} />
					</Picker>
				</Pressable>
				{currency == "Otra" && (
					<TextInput
						placeholder="Nueva moneda"
						style={STYLES.textInput}
						maxLength={8}
						selectionColor={COLORS.primary}
						value={otherCurrency}
						onChangeText={(newCurr) => setOtherCurrency(newCurr)}
					/>
				)}
				{incomplete.currency && (
					<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
				)}
				<TextInput
					placeholder="Monto inicial"
					style={STYLES.textInput}
					maxLength={10}
					selectionColor={COLORS.primary}
					value={ammount}
					keyboardType="numeric"
					onChangeText={(newAmmount) => setAmmount(newAmmount)}
				/>
				<Pressable
					style={STYLES.pickerInput}
					onPress={() => pickerCategory.current.focus()}
				>
					<Picker
						selectedValue={category}
						onValueChange={(itemValue) => setCategory(itemValue)}
						ref={pickerCategory}
						mode="dropdown"
					>
						<Picker.Item
							label="Tipo de cuenta"
							value=""
							style={{ color: COLORS.lightGray, fontSize: 20 }}
						/>
						{ACCOUNTS_CATEGORIES.map((categoryName, key) => (
							<Picker.Item
								key={key}
								label={`Cuenta de ${categoryName}`}
								value={categoryName}
								style={STYLES.bigText}
							/>
						))}
					</Picker>
				</Pressable>
				<Pressable
					onPress={onAdd}
					style={{ ...STYLES.btnPrimary, paddingVertical: 5, marginTop: 15 }}
				>
					<Text style={STYLES.btnPrimaryText}>Añadir</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
};
