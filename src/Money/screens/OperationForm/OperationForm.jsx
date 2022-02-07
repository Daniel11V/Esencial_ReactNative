import {
	Animated,
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import {
	AdMobBanner
  } from 'expo-ads-admob';
import React, { useEffect, useRef, useState } from "react";
import {
	addOperation,
	updateAccount,
} from "../../../../store/actions/money.action";

import { COLORS } from "../../../../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { STYLES } from "../../../../constants/styles";
import { ImageSelector } from "../../components/ImageSelector/ImageSelector";

const MovementForm = ({ navigation }) => {
	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);

	const [loading, setLoading] = useState(true);
	const [enoughAccounts, setEnoughAccounts] = useState(false);

	const [title, setTitle] = useState("");

	const fromBankList = useSelector(
		(state) => state.money.currentRegister.banks
	);

	const [fromName, setFromName] = useState("");
	const [fromCurrency, setFromCurrency] = useState("");
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
		// Si existen dos cuentas distintas o una con más de una moneda, para poder hacer transaccion entre ellas
		const areEnoughAccounts =
			Object.keys(fromBankList).length > 1 ||
			(Object.keys(fromBankList).length === 1 &&
				Object.keys(Object.values(fromBankList)[0].accounts).length > 1);

		setEnoughAccounts(areEnoughAccounts);
		setLoading(false);

		if (areEnoughAccounts) {
			setFromName(Object.values(fromBankList)[0].name);
		}
	}, [fromBankList]);

	useEffect(() => {
		if (fromName.length) {
			setFromCurrency(
				Object.values(fromBankList[fromName].accounts)[0].currency
			);
		}
	}, [fromName]);

	useEffect(() => {
		// Update sendToBankList when fromName or fromCurrency change
		if (enoughAccounts) {
			const fromBankListCopy = JSON.parse(JSON.stringify(fromBankList));
			delete fromBankListCopy[fromName].accounts[fromCurrency];
			if (!Object.keys(fromBankListCopy[fromName].accounts).length) {
				delete fromBankListCopy[fromName];
			}

			setSendToBankList({ ...fromBankListCopy });

			setSendToName(Object.values(fromBankListCopy)[0].name);

			setSendToCurrency(
				Object.values(Object.values(fromBankListCopy)[0].accounts).some(
					(account) => !account.currency?.localeCompare(fromCurrency)
				)
					? fromCurrency
					: Object.values(Object.values(fromBankListCopy)[0].accounts)[0]
							?.currency
			);
		}
	}, [fromName, fromCurrency]);

	const onAdd = () => {
		Keyboard.dismiss();

		if (fromAmmount && sendToAmmount) {
			dispatch(
				addOperation(registerId, {
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
					registerId,
					fromName,
					fromCurrency,
					"ammount",
					fromBankList[fromName].accounts[fromCurrency].ammount -
						Number(fromAmmount)
				)
			);

			dispatch(
				updateAccount(
					registerId,
					sendToName,
					sendToCurrency,
					"ammount",
					fromBankList[sendToName].accounts[sendToCurrency].ammount +
						Number(sendToAmmount)
				)
			);

			navigation.goBack();
		} else {
			setIncomplete({
				fromAmmount: !(Number(fromAmmount) > 0),
				sendToAmmount: !(Number(sendToAmmount) > 0),
			});
		}
	};

	if (loading) {
		return <View></View>;
	}

	return !enoughAccounts ? (
		<View
			style={{
				height: 300,
				justifyContent: "flex-end",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontSize: 18,
					paddingHorizontal: 15,
					textAlign: "center",
				}}
			>
				Cuentas insuficientes para realizar un movimiento entre ellas.
			</Text>
		</View>
	) : (
		<View>
			<TextInput
				placeholder="Titulo / Motivo de la operación"
				style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 20 }}
				maxLength={65}
				selectionColor={COLORS.primary}
				value={title}
				onChangeText={(text) => setTitle(text)}
			/>
			<Text style={{ ...STYLES.subtitle, marginBottom: 0, marginTop: 15 }}>
				Cuenta origen
			</Text>
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
			{fromBankList[fromName].accounts[fromCurrency]?.ammount < fromAmmount && (
				<Text style={STYLES.incompleteInput}>
					{"Monto máximo en cuenta: $"}
					{fromBankList[fromName].accounts[fromCurrency]?.ammount}
				</Text>
			)}
			<Text style={{ ...STYLES.subtitle, marginTop: 20, marginBottom: 0 }}>
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
				style={{
					...STYLES.btnPrimary,
					paddingVertical: 5,
					marginTop: 25,
				}}
			>
				<Text style={STYLES.btnPrimaryText}>Confirmar</Text>
			</Pressable>
		</View>
	);
};

const IncomeForm = ({ navigation }) => {
	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);

	const [loading, setLoading] = useState(true);
	const [enoughAccounts, setEnoughAccounts] = useState(false);

	const [title, setTitle] = useState("");

	const bankList = useSelector((state) => state.money.currentRegister.banks);

	const [name, setName] = useState("");
	const [currency, setCurrency] = useState("");
	const [ammount, setAmmount] = useState(null);

	const [incomplete, setIncomplete] = useState({
		ammount: false,
	});

	const pickerName = useRef();
	const pickerCurrency = useRef();

	useEffect(() => {
		// Si existe alguna cuenta para recibir dinero
		const areEnoughAccounts = Object.keys(bankList).length > 0;
		setEnoughAccounts(areEnoughAccounts);
		setLoading(false);

		if (areEnoughAccounts) {
			setName(Object.values(bankList)[0].name);
		}
	}, [bankList]);

	useEffect(() => {
		if (name.length) {
			setCurrency(Object.values(bankList[name].accounts)[0].currency);
		}
	}, [name]);

	const onAddIncome = () => {
		Keyboard.dismiss();

		if (ammount.length) {
			dispatch(
				addOperation(registerId, {
					type: 4,
					title,
					creationDate: Date.now(),
					sendTo: {
						name,
						currency,
						ammount: Number(ammount),
					},
				})
			);

			dispatch(
				updateAccount(
					registerId,
					name,
					currency,
					"ammount",
					bankList[name].accounts[currency].ammount + Number(ammount)
				)
			);

			navigation.goBack();
		} else {
			setIncomplete({
				ammount: !(Number(ammount) > 0),
			});
		}
	};

	if (loading) {
		return <View></View>;
	}

	return !enoughAccounts ? (
		<View
			style={{
				height: 300,
				justifyContent: "flex-end",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontSize: 18,
					paddingHorizontal: 15,
					textAlign: "center",
				}}
			>
				No posee cuentas registradas para recibir dinero.
			</Text>
		</View>
	) : (
		<View>
			<TextInput
				placeholder="Titulo / Motivo de la operación"
				style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 20 }}
				maxLength={65}
				selectionColor={COLORS.primary}
				value={title}
				onChangeText={(text) => setTitle(text)}
			/>
			<Text style={{ ...STYLES.subtitle, marginBottom: 0, marginTop: 15 }}>
				Cuenta destino
			</Text>
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
						onChangeText={(newAmmount) => setAmmount(newAmmount)}
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
						{Object.keys(bankList[name].accounts).map((currency, key) => (
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
			{incomplete.ammount && (
				<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
			)}
			<Pressable
				onPress={onAddIncome}
				style={{
					...STYLES.btnPrimary,
					paddingVertical: 5,
					marginTop: 25,
				}}
			>
				<Text style={STYLES.btnPrimaryText}>Confirmar</Text>
			</Pressable>
		</View>
	);
};

const PayForm = ({ navigation }) => {
	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);

	const [loading, setLoading] = useState(true);
	const [enoughAccounts, setEnoughAccounts] = useState(false);

	const [title, setTitle] = useState("");

	const bankList = useSelector((state) => state.money.currentRegister.banks);

	const [name, setName] = useState("");
	const [currency, setCurrency] = useState("");
	const [ammount, setAmmount] = useState(null);
	const [photo, setPhoto] = useState("");
	const [pointON, setPointON] = useState(false);

	const [incomplete, setIncomplete] = useState({
		ammount: false,
	});

	const pickerName = useRef();
	const pickerCurrency = useRef();

	useEffect(() => {
		// Si existe alguna cuenta para recibir dinero
		const areEnoughAccounts = Object.keys(bankList).length > 0;
		setEnoughAccounts(areEnoughAccounts);
		setLoading(false);

		if (areEnoughAccounts) {
			setName(Object.values(bankList)[0].name);
		}
	}, [bankList]);

	useEffect(() => {
		if (name.length) {
			setCurrency(Object.values(bankList[name].accounts)[0].currency);
		}
	}, [name]);

	const onAddPay = () => {
		Keyboard.dismiss();

		if (ammount.length) {
			dispatch(
				addOperation(registerId, {
					type: 5,
					title,
					creationDate: Date.now(),
					photo,
					from: {
						name,
						currency,
						ammount: Number(ammount),
					},
				})
			);

			dispatch(
				updateAccount(
					registerId,
					name,
					currency,
					"ammount",
					bankList[name].accounts[currency].ammount - Number(ammount)
				)
			);

			navigation.goBack();
		} else {
			setIncomplete({
				ammount: !(Number(ammount) > 0),
			});
		}
	};

	if (loading) {
		return <View></View>;
	}
	
	const checkValue = (value) => {
		if(ammount){
			if(value.length > ammount.length && ammount[ammount.length-3] == "."){
				return ammount;
			}
		}
		
		if(value[value.length-1] == "." && value.length > ammount.length && !pointON){
			setAmmount(value)
			setPointON(true);	
			return ammount;
		}
		if(ammount){
			if(ammount[ammount.length-1] == "." && value.length < ammount.length){
				setAmmount(value)
				setPointON(false);		
				return ammount;
			}
		}
		if(value[value.length-1] == "." && value.length < ammount.length){
			setAmmount(value)
		}
		
		if(value){
			if(value[value.length-1] !== "." && value[value.length-1] !== "-" && value[value.length-1] !== " " && value[value.length-1] !== ","){
				setAmmount(value)	
			}
		}else{
			setAmmount(value)
		}
		
		return ammount;
	}
	
	return !enoughAccounts ? (
		<View
			style={{
				height: 300,
				justifyContent: "flex-end",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontSize: 18,
					paddingHorizontal: 15,
					textAlign: "center",
				}}
			>
				No posee cuentas registradas para recibir dinero.
			</Text>
		</View>
	) : (
		<View>
			<TextInput
				placeholder="Titulo / Motivo de la operación"
				style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 20 }}
				maxLength={65}
				selectionColor={COLORS.primary}
				value={title}
				onChangeText={(text) => setTitle(text)}
			/>
			<Text style={{ ...STYLES.subtitle, marginBottom: 0, marginTop: 15 }}>
				Cuenta origen
			</Text>
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
						{Object.keys(bankList[name].accounts).map((currency, key) => (
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
			{incomplete.ammount && (
				<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
			)}
			{bankList[name].accounts[currency]?.ammount < ammount && (
				<Text style={STYLES.incompleteInput}>
					{"Monto máximo en cuenta: $"}
					{bankList[name].accounts[currency]?.ammount}
				</Text>
			)}
			<ImageSelector updateImage={(image) => setPhoto(image)} />
			<Pressable
				onPress={onAddPay}
				style={{
					...STYLES.btnPrimary,
					paddingVertical: 5,
					marginTop: 25,
				}}
			>
				<Text style={STYLES.btnPrimaryText}>Confirmar</Text>
			</Pressable>
		</View>
	);
};

export const OperationForm = ({ navigation }) => {
	const [type, setType] = useState("Pago");
	const opac = {
		Movimiento: useRef(new Animated.Value(0)).current,
		Ingreso: useRef(new Animated.Value(0)).current,
		Pago: useRef(new Animated.Value(1)).current,
	};

	const changeType = (newType) => {
		Animated.timing(opac[type], {
			toValue: 0,
			duration: 50,
			useNativeDriver: true,
		}).start(() => {
			setType(newType);

			Animated.timing(opac[newType], {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		});
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
					onPress={() => changeType("Movimiento")}
					style={{
						...(type == "Movimiento"
							? STYLES.btnSecondary
							: STYLES.roundedItem),
						paddingHorizontal: 10,
						paddingVertical: 10,
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
				<View style={STYLES.boxesContainer}>
					<Pressable
						onPress={() => changeType("Ingreso")}
						style={{
							...(type == "Ingreso"
								? STYLES.btnSecondaryMiddle
								: STYLES.roundedItemMiddle),
							paddingHorizontal: 10,
							paddingVertical: 10,
						}}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								...(type == "Ingreso" && { color: COLORS.primary }),
							}}
						>
							Ingreso
						</Text>
					</Pressable>
					<Pressable
						onPress={() => changeType("Pago")}
						style={{
							...(type == "Pago"
								? STYLES.btnSecondaryMiddle
								: STYLES.roundedItemMiddle),
							paddingHorizontal: 10,
							paddingVertical: 10,
						}}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								...(type == "Pago" && { color: COLORS.primary }),
							}}
						>
							Pago
						</Text>
					</Pressable>
				</View>
				<View style={{ justifyContent: "center" }}>
					{type === "Movimiento" && (
						<Animated.View style={{ opacity: opac["Movimiento"] }}>
							<MovementForm navigation={navigation} />
							{/* <PayForm navigation={navigation} /> */}
							{/* <IncomeForm navigation={navigation} /> */}
						</Animated.View>
					)}
					{type === "Ingreso" && (
						<Animated.View style={{ opacity: opac["Ingreso"] }}>
							<IncomeForm navigation={navigation} />
						</Animated.View>
					)}
					{type === "Pago" && (
						<Animated.View style={{ opacity: opac["Pago"] }}>
							<PayForm navigation={navigation} />
						</Animated.View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
