import {
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
	addOperation,
	updateAccount,
} from "../../../../store/actions/money.action";

import { COLORS } from "../../../../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { STYLES } from "../../../../constants/styles";

export const OperationForm = ({ navigation }) => {
	const dispatch = useDispatch();

	const [type, setType] = useState("Movimiento");

	const [title, setTitle] = useState("");

	const fromBankList = useSelector((state) => state.money.banks);

	const [fromName, setFromName] = useState(Object.values(fromBankList)[0].name);
	const [fromCurrency, setFromCurrency] = useState(
		Object.values(Object.values(fromBankList)[0].accounts)[0].currency
	);
	const [fromAmmount, setFromAmmount] = useState(null);

	const [sendToBankList, setSendToBankList] = useState({
		Efectivo: { accounts: { USD: {} } },
	});

	const [sendToName, setSendToName] = useState("Efectivo");
	const [sendToCurrency, setSendToCurrency] = useState("USD");
	const [sendToAmmount, setSendToAmmount] = useState(null);

	const [incomplete, setIncomplete] = useState({
		fromAmmount: false,
		sendToAmmount: false,
	});

	const pickerFromName = useRef();
	const pickerFromCurrency = useRef();
	const pickerSendToName = useRef();
	const pickerSendToCurrency = useRef();

	useEffect(() => {
		setFromCurrency(Object.values(fromBankList[fromName].accounts)[0].currency);
	}, [fromBankList, fromName]);

	useEffect(() => {
		// Update sendToBankList when fromName or fromCurrency change
		const fromBankListCopy = JSON.parse(JSON.stringify(fromBankList));
		delete fromBankListCopy[fromName].accounts[fromCurrency];
		if (!Object.keys(fromBankListCopy[fromName].accounts).length) {
			delete fromBankListCopy[fromName];
		}

		setSendToBankList({ ...fromBankListCopy });

		setSendToName(Object.values(fromBankListCopy)[0].name);

		setSendToCurrency(
			Object.values(Object.values(fromBankListCopy)[0].accounts).some(
				(account) => !account.currency.localeCompare(fromCurrency)
			)
				? fromCurrency
				: Object.values(Object.values(fromBankListCopy)[0].accounts)[0].currency
		);
	}, [fromBankList, fromName, fromCurrency]);

	const onAdd = () => {
		Keyboard.dismiss();

		if (fromAmmount && sendToAmmount) {
			if (type === "Movimiento") {
				dispatch(
					addOperation({
						type: 2,
						title,
						creationDate: Date.now(),
						from: {
							name: fromName,
							currency: fromCurrency,
							ammount: Number(fromAmmount),
						},
						sendTo: {
							name: sendToName,
							currency: sendToCurrency,
							ammount: Number(sendToAmmount),
						},
					})
				);

				dispatch(
					updateAccount(
						fromName,
						fromCurrency,
						"ammount",
						fromBankList[fromName].accounts[fromCurrency].ammount -
							Number(fromAmmount)
					)
				);

				dispatch(
					updateAccount(
						sendToName,
						sendToCurrency,
						"ammount",
						fromBankList[sendToName].accounts[sendToCurrency].ammount +
							Number(sendToAmmount)
					)
				);

				navigation.goBack();
			}
		} else {
			setIncomplete({
				fromAmmount: !(Number(fromAmmount) > 0),
				sendToAmmount: !(Number(sendToAmmount) > 0),
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
				<Pressable
					onPress={() => setType("Movimiento")}
					style={{
						...(type == "Movimiento"
							? STYLES.btnSecondary
							: STYLES.roundedItem),
						paddingHorizontal: 12,
						paddingVertical: 12,
					}}
				>
					<Text
						style={{
							...STYLES.bigText,
							fontWeight: "bold",
							...(type == "Movimiento" && { color: COLORS.primary }),
						}}
					>
						Movimiento entre mis cuentas
					</Text>
				</Pressable>
				<TextInput
					placeholder="Titulo / Motivo de la operación"
					style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 14 }}
					maxLength={65}
					selectionColor={COLORS.primary}
					value={title}
					onChangeText={(text) => setTitle(text)}
				/>
				<Text style={STYLES.subtitle}>Cuenta origen</Text>
				<Pressable
					style={{ ...STYLES.pickerInput, marginTop: 0 }}
					onPress={() => pickerFromName.current.focus()}
				>
					<Picker
						selectedValue={fromName}
						onValueChange={(text) => setFromName(text)}
						ref={pickerFromName}
						mode="dropdown"
					>
						{Object.keys(fromBankList).map((bankName, key) => (
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
							value={fromAmmount}
							keyboardType="numeric"
							onChangeText={(newAmmount) => {
								setFromAmmount(newAmmount);
								!fromCurrency.localeCompare(sendToCurrency) &&
									setSendToAmmount(newAmmount);
							}}
						/>
					</View>
					<Pressable
						style={{
							...STYLES.pickerInput,
							width: "45%",
							flexGrow: 0,
							marginTop: 0,
						}}
						onPress={() => pickerFromCurrency.current.focus()}
					>
						<Picker
							selectedValue={fromCurrency}
							onValueChange={(itemValue) => setFromCurrency(itemValue)}
							ref={pickerFromCurrency}
							mode="dropdown"
						>
							{Object.keys(fromBankList[fromName].accounts).map(
								(currency, key) => (
									<Picker.Item
										key={key}
										label={currency}
										value={currency}
										style={STYLES.bigText}
									/>
								)
							)}
						</Picker>
					</Pressable>
				</View>
				{incomplete.fromAmmount && (
					<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
				)}
				{fromBankList[fromName].accounts[fromCurrency]?.ammount <
					fromAmmount && (
					<Text style={STYLES.incompleteInput}>
						Monto máximo en cuenta: $
						{fromBankList[fromName].accounts[fromCurrency]?.ammount}
					</Text>
				)}
				<Text style={{ ...STYLES.subtitle, marginTop: 35 }}>
					Cuenta destino
				</Text>
				<Pressable
					style={{ ...STYLES.pickerInput, marginTop: 0 }}
					onPress={() => pickerSendToName.current.focus()}
				>
					<Picker
						selectedValue={sendToName}
						onValueChange={(text) => setSendToName(text)}
						ref={pickerSendToName}
						mode="dropdown"
					>
						{Object.keys(sendToBankList).map((bankName, key) => (
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
						{sendToCurrency.localeCompare(fromCurrency) === 0 ? (
							<Text style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 14 }}>
								{sendToAmmount ? sendToAmmount : 0}
							</Text>
						) : (
							<TextInput
								placeholder="0"
								style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 14 }}
								maxLength={10}
								selectionColor={COLORS.primary}
								value={sendToAmmount}
								keyboardType="numeric"
								onChangeText={(newAmmount) => setSendToAmmount(newAmmount)}
							/>
						)}
					</View>
					<Pressable
						style={{
							...STYLES.pickerInput,
							width: "45%",
							flexGrow: 0,
							marginTop: 0,
						}}
						onPress={() => pickerSendToCurrency.current.focus()}
					>
						<Picker
							selectedValue={sendToCurrency}
							onValueChange={(itemValue) => setSendToCurrency(itemValue)}
							ref={pickerSendToCurrency}
							mode="dropdown"
						>
							{Object.keys(sendToBankList[sendToName].accounts).map(
								(currencyName, key) => (
									<Picker.Item
										key={key}
										label={currencyName}
										value={currencyName}
										style={STYLES.bigText}
									/>
								)
							)}
						</Picker>
					</Pressable>
				</View>
				{incomplete.sendToAmmount && (
					<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
				)}
				<Pressable
					onPress={onAdd}
					style={{ ...STYLES.btnPrimary, paddingVertical: 5, marginTop: 25 }}
				>
					<Text style={STYLES.btnPrimaryText}>Confirmar</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
};
