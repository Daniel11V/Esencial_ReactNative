import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { STYLES } from "../../../../../constants/styles";
import { BANKS_DEFAULT } from "../../../../../constants/bankConstants";
import { COLORS } from "../../../../../constants/colors";

export const MoneyAccountInput = ({
	completeBankList = BANKS_DEFAULT,
	fromName = "",
	fromCurrency = "",
	fromAmmount = null,
	otherBankAvailable = false,
	otherCurrencyAvailable = false,
	name = "Efectivo",
	setName = (v) => (name = v),

	currency = "ARS",
	setCurrency = (v) => (currency = v),

	ammount = null,
	setAmmount = (v) => (ammount = v),

	otherBankIncomplete = false,
	otherCurrencyIncomplete = false,
	ammountIncomplete = false,

	isIncome = false,
}) => {
	const [bankList, setBankList] = useState(completeBankList);
	const [pointON, setPointON] = useState(false);

	const pickerName = useRef();
	const pickerCurrency = useRef();

	useEffect(() => {
		if (completeBankList !== BANKS_DEFAULT) {
			if (fromName.length) {
				const fromBankListCopy = JSON.parse(JSON.stringify(completeBankList));
				delete fromBankListCopy[fromName].accounts[fromCurrency];
				if (!Object.keys(fromBankListCopy[fromName].accounts).length) {
					delete fromBankListCopy[fromName];
				}
				setBankList({ ...fromBankListCopy });

				const bankWithSameCurrency = Object.values(fromBankListCopy).find(
					(bank) =>
						Object.keys(bank.accounts).some(
							(acc) => !acc.localeCompare(fromCurrency)
						)
				);
				setName(
					bankWithSameCurrency
						? bankWithSameCurrency.name
						: Object.keys(fromBankListCopy)[0]
				);
			} else {
				setBankList(completeBankList);
				setName(Object.values(completeBankList)[0]?.name);
			}
		}
	}, [completeBankList]);

	useEffect(() => {
		if (name.length) {
			if (fromName.length) {
				setCurrency(
					Object.keys(bankList[name].accounts).some(
						(acc) => !acc.localeCompare(fromCurrency)
					)
						? fromCurrency
						: Object.keys(bankList[name]?.accounts)[0]
				);
			} else {
				setCurrency(Object.keys(bankList[name]?.accounts)[0]);
			}
		}
	}, [name]);

	useEffect(() => {
		if (fromCurrency.length && !currency.localeCompare(fromCurrency)) {
			setAmmount(fromAmmount ? fromAmmount : "0");
		}
	}, [currency]);

	const checkValue = (value) => {
		if (ammount) {
			if (value.length > ammount.length && ammount[ammount.length - 3] == ".") {
				return ammount;
			}
		}

		if (
			value[value.length - 1] == "." &&
			value.length > ammount.length &&
			!pointON
		) {
			setAmmount(value);
			setPointON(true);
			return ammount;
		}
		if (ammount) {
			if (ammount[ammount.length - 1] == "." && value.length < ammount.length) {
				setAmmount(value);
				setPointON(false);
				return ammount;
			}
		}
		if (value[value.length - 1] == "." && value.length < ammount.length) {
			setAmmount(value);
		}

		if (value) {
			if (
				value[value.length - 1] !== "." &&
				value[value.length - 1] !== "-" &&
				value[value.length - 1] !== " " &&
				value[value.length - 1] !== ","
			) {
				setAmmount(value);
			}
		} else {
			setAmmount(value);
		}

		return ammount;
	};

	return (
		<View>
			<Pressable
				style={{ ...STYLES.pickerInput, marginTop: 0 }}
				onPress={() => pickerName.current.focus()}
			>
				<Picker
					selectedValue={name}
					onValueChange={(text) => setName(text)}
					ref={pickerName}
					mode="dropdown"
				>
					{Object.keys(bankList).map((bankName, key) => (
						<Picker.Item
							key={key}
							label={bankName}
							value={bankName}
							style={STYLES.bigText}
						/>
					))}
				</Picker>
			</Pressable>
			<View style={STYLES.row}>
				<View
					style={{
						...STYLES.row,
						justifyContent: "flex-start",
						width: "45%",
					}}
				>
					<Text style={{ ...STYLES.textInput, marginTop: 14 }}>$</Text>
					<TextInput
						placeholder="0"
						style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 14 }}
						maxLength={10}
						selectionColor={COLORS.primary}
						value={ammount}
						keyboardType="numeric"
						onChangeText={(newAmmount) => checkValue(newAmmount)}
					/>
				</View>
				<Pressable
					style={{
						...STYLES.pickerInput,
						width: "45%",
						flexGrow: 0,
						marginTop: 0,
					}}
					onPress={() => pickerCurrency.current.focus()}
				>
					<Picker
						selectedValue={currency}
						onValueChange={(itemValue) => setCurrency(itemValue)}
						ref={pickerCurrency}
						mode="dropdown"
					>
						{Object.keys(bankList[name]?.accounts).map((currency, key) => (
							<Picker.Item
								key={key}
								label={currency}
								value={currency}
								style={STYLES.bigText}
							/>
						))}
					</Picker>
				</Pressable>
			</View>
			{ammountIncomplete && (
				<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
			)}
			{!!(
				!isIncome && bankList[name]?.accounts[currency]?.ammount < ammount
			) && (
				<Text style={STYLES.incompleteInput}>
					{"Monto máximo en cuenta: $"}
					{bankList[name]?.accounts[currency]?.ammount}
				</Text>
			)}
		</View>
	);
};
