import {
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useContext, useRef, useState } from "react";

import { ACCOUNTS_CATEGORIES } from "../../../../constants/accountsCategories";
import { BankContext } from "../../context/BankContext";
import { COLORS } from "../../../../constants/colors";
import { CURRENCIES } from "../../../../constants/currencies";
import { Picker } from "@react-native-picker/picker";

export const BankForm = ({ route, navigation }) => {
	const { insideBank, isNewCurrency } = route.params;
	const { banks, setBanks } = useContext(BankContext);
	const currentBankPosition = isNewCurrency
		? banks.findIndex((bank) => bank.id == insideBank)
		: null;
	const [name, setName] = useState(
		isNewCurrency ? banks[currentBankPosition].name : ""
	);
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
					!banks[currentBankPosition].accounts.some(
						(account) => account.currency == curr.name
					)
		  )
		: [...CURRENCIES];

	const pickerCurrency = useRef();
	const pickerCategory = useRef();

	const onAdd = () => {
		Keyboard.dismiss();

		if (name && currency) {
			if (isNewCurrency) {
				let banksUpdatedAdd = [...banks];

				banksUpdatedAdd[currentBankPosition].accounts.push({
					currency: currency == "Otra" ? otherCurrency : currency,
					ammount: ammount ? ammount : 0,
					category,
				});

				setBanks([...banksUpdatedAdd]);
			} else {
				setBanks((banks) => [
					...banks,
					{
						id: banks.length > 0 ? banks[banks.length - 1].id + 1 : 1,
						name,
						accounts: [
							{
								ammount: ammount ? ammount : 0,
								currency: currency == "Otra" ? otherCurrency : currency,
								category,
							},
						],
					},
				]);
			}

			navigation.goBack();
		} else {
			setIncomplete({
				name: !(name.length > 0),
				currency: !(currency.length > 0),
			});
		}
	};

	return (
		<SafeAreaView
			style={{ ...styles.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<View>
				<ScrollView
					style={styles.nuevaCuenta}
					keyboardShouldPersistTaps="handled"
				>
					{/* <Pressable
						onPress={() => setNewCurrency((value) => !value)}
						style={styles.newCurrencyContainer}
					>
						<RadioButton selected={newCurrency} />
						<Text style={styles.newCurrencyText}>
							Moneda nueva en cuenta existente
						</Text>
					</Pressable> */}
					{isNewCurrency ? (
						<Text style={{ ...styles.nuevaCuentaInput, marginTop: 40 }}>
							{name}
						</Text>
					) : (
						<TextInput
							placeholder="Nombre de cuenta*"
							style={{ ...styles.nuevaCuentaInput, marginTop: 40 }}
							maxLength={20}
							selectionColor={COLORS.primary}
							value={name}
							onChangeText={(text) => setName(text)}
						/>
					)}
					{incomplete.name && (
						<Text style={styles.incomplete}>Campo Requerido</Text>
					)}
					<Pressable
						style={styles.pickerInput}
						onPress={() => pickerCurrency.current.focus()}
					>
						<Picker
							selectedValue={currency}
							onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
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
									style={styles.pickerItem}
								/>
							))}
							<Picker.Item
								label="Otra..."
								value="Otra"
								style={styles.pickerItem}
							/>
						</Picker>
					</Pressable>
					{currency == "Otra" && (
						<TextInput
							placeholder="Nueva moneda"
							style={styles.nuevaCuentaInput}
							maxLength={8}
							selectionColor={COLORS.primary}
							value={otherCurrency}
							onChangeText={(newCurr) => setOtherCurrency(newCurr)}
						/>
					)}
					{incomplete.currency && (
						<Text style={styles.incomplete}>Campo Requerido</Text>
					)}
					<TextInput
						placeholder="Monto inicial"
						style={styles.nuevaCuentaInput}
						maxLength={10}
						selectionColor={COLORS.primary}
						value={ammount}
						keyboardType="numeric"
						onChangeText={(newAmmount) => setAmmount(newAmmount)}
					/>
					<Pressable
						style={styles.pickerInput}
						onPress={() => pickerCategory.current.focus()}
					>
						<Picker
							selectedValue={category}
							onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
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
									style={styles.pickerItem}
								/>
							))}
						</Picker>
					</Pressable>
					<Pressable onPress={onAdd} style={styles.nuevaCuentaSubmit}>
						<Text style={styles.nuevaCuentaSubmitText}>Añadir</Text>
					</Pressable>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		padding: 20,
		width: "100%",
		minHeight: "100%",
		backgroundColor: COLORS.backgroundScreen,
	},
	nuevaCuenta: {
		height: "100%",
	},
	newCurrencyContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	newCurrencyText: {
		color: COLORS.primary,
		marginLeft: 10,
		fontSize: 18,
	},
	pickerInput: {
		marginTop: 15,
		marginBottom: 10,
		minHeight: 65,
		fontSize: 20,
		borderBottomWidth: 2,
		borderBottomColor: COLORS.primary,
	},
	pickerItem: {
		color: COLORS.textScreen,
		fontSize: 20,
	},
	nuevaCuentaInput: {
		marginTop: 30,
		marginBottom: 10,
		paddingLeft: 8,
		paddingBottom: 20,
		fontSize: 20,
		borderBottomWidth: 2,
		borderBottomColor: COLORS.primary,
	},
	incomplete: {
		color: COLORS.deleteRed,
		fontStyle: "italic",
		fontSize: 15,
	},
	nuevaCuentaSubmit: {
		marginTop: 20,
		backgroundColor: COLORS.primary,
		borderRadius: 10,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		elevation: 6,
	},
	nuevaCuentaSubmitText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
