import {
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";

import React, { useRef, useState } from "react";
import {
	addAccount,
	addBank,
	addOperation,
} from "../../../../store/actions/money.action";

import { COLORS } from "../../../../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { STYLES } from "../../../../constants/styles";
import {
	CURRENCIES,
	ACCOUNTS_CATEGORIES,
	BANKS_INFO,
} from "../../../../constants/bankConstants";
import { FacebookBanner } from "../../components/FacebookBanner/FacebookBanner";

export const BankForm = ({ route, navigation }) => {
	const { insideBank, isNewCurrency } = route.params;

	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);
	const bank = useSelector(
		(state) => state.money.currentRegister.banks[insideBank]
	);
	const bankNames = useSelector((state) =>
		Object.keys(state.money.currentRegister.banks)
	);

	const currencyNames = useSelector((state) =>
		isNewCurrency
			? Object.keys(state.money.currentRegister.banks[insideBank].accounts)
			: []
	);
	const possibleBanks = useSelector((state) =>
		BANKS_INFO.filter(
			(bank) =>
				Object.keys(state.money.currentRegister.banks).indexOf(bank.name) ===
					-1 && bank.name !== "Default"
		)
	);

	const [name, setName] = useState(isNewCurrency ? bank.name : "");
	const [otherName, setOtherName] = useState("");
	const [currency, setCurrency] = useState("");
	const [otherCurrency, setOtherCurrency] = useState("");
	const [ammount, setAmmount] = useState(null);
	const [category, setCategory] = useState("");

	const [incomplete, setIncomplete] = useState({
		name: "",
		currency: "",
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

		let alreadyExist;

		if (isNewCurrency) {
			alreadyExist = otherCurrency
				? currencyNames.some(
						(name) => !name.localeCompare(otherCurrency.toUpperCase())
				  )
				: false;
		} else {
			alreadyExist = otherName
				? bankNames.some((name) => !name.localeCompare(otherName))
				: false;
		}

		const newName = name === "Otra" ? otherName : name;

		const newCurrency =
			currency == "Otra" ? otherCurrency.toUpperCase() : currency.toUpperCase();

		if (newName && newCurrency && !alreadyExist) {
			dispatch(
				addOperation(registerId, {
					type: 1,
					creationDate: Date.now(),
					accountName: newName,
					currencyName: newCurrency,
					initialAmmount: ammount ? Number(ammount) : 0,
				})
			);

			if (isNewCurrency) {
				dispatch(
					addAccount(registerId, bank.name, {
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
					addBank(registerId, {
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
			let newNameError = "";
			if (!(name.length > 0)) {
				newNameError = "Campo requerido";
			} else if (alreadyExist && !isNewCurrency) {
				newNameError = "Nombre en uso";
			} else if (!(otherName.length > 0) && !isNewCurrency && name === "Otra") {
				newNameError = "Campo requerido";
			}

			let newCurrencyError = "";
			if (!(currency.length > 0)) {
				newCurrencyError = "Campo requerido";
			} else if (alreadyExist && isNewCurrency) {
				newCurrencyError = "Nombre en uso";
			} else if (!(otherCurrency.length > 0) && currency == "Otra") {
				newCurrencyError = "Campo requerido";
			}

			setIncomplete({
				name: newNameError,
				currency: newCurrencyError,
			});
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }} forceInset="top">
			<FacebookBanner />
			<ScrollView
				style={{ height: "100%", ...STYLES.screenContainer }}
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

				{incomplete.name.length > 0 && (
					<Text style={STYLES.incompleteInput}>{incomplete.name}</Text>
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
				{incomplete.currency.length > 0 && (
					<Text style={STYLES.incompleteInput}>{incomplete.currency}</Text>
				)}
				<View
					style={{
						...STYLES.row,
						justifyContent: "flex-start",
						flex: 1,
					}}
				>
					<Text style={{ ...STYLES.textInput }}>$</Text>
					<TextInput
						placeholder="Monto inicial"
						style={{ ...STYLES.textInput, flexGrow: 1 }}
						maxLength={10}
						selectionColor={COLORS.primary}
						value={ammount}
						keyboardType="numeric"
						onChangeText={(newAmmount) => setAmmount(newAmmount)}
					/>
				</View>

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
