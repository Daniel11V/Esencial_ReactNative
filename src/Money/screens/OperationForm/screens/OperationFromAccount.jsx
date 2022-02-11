import React, { useContext, useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import { STYLES } from "../../../../../constants/styles";
import { NavigationButtons } from "../components/NavigationButtons";
import { OperationFormContext } from "../context/OperationFormContextProvider";
import { useSelector } from "react-redux";
import { MoneyAccountInput } from "../components/MoneyAccountInput";

export const OperationFromAccount = ({ navigation }) => {
	const {
		type,
		fromName,
		setFromName,
		fromCurrency,
		setFromCurrency,
		fromAmmount,
		setFromAmmount,
	} = useContext(OperationFormContext);

	const bankList = useSelector((state) => state.money.currentRegister.banks);
	const [enoughAccounts, setEnoughAccounts] = useState(false);
	const [loading, setLoading] = useState(true);

	const [incomplete, setIncomplete] = useState({
		fromAmmount: false,
	});

	useEffect(() => {
		// Si existe alguna cuenta para recibir dinero
		let areEnoughAccounts = false;
		if (type === "Pago") {
			areEnoughAccounts = Object.keys(bankList).length > 0;
		} else if (type === "Movimiento") {
			areEnoughAccounts =
				Object.keys(bankList).length > 1 ||
				(Object.keys(bankList).length === 1 &&
					Object.keys(Object.values(bankList)[0].accounts).length > 1);
		}
		setEnoughAccounts(areEnoughAccounts);
		setLoading(false);
	}, [bankList]);

	const nextStep = () => {
		Keyboard.dismiss();

		if (fromAmmount > 0) {
			if (!type.localeCompare("Movimiento")) {
				navigation.push("OperationSendToAccount", {
					fromName: fromName,
					fromCurrency: fromCurrency,
					fromAmmount: fromAmmount,
				});
			} else {
				navigation.push("OperationFormDetails");
			}
		} else {
			setIncomplete({
				fromAmmount: !(Number(fromAmmount) > 0),
			});
		}
	};

	if (loading) {
		return (
			<SafeAreaView
				style={{ ...STYLES.screenContainer, flex: 1 }}
				forceInset="top"
			>
				<ScrollView
					style={{ height: "100%" }}
					keyboardShouldPersistTaps="handled"
				></ScrollView>
			</SafeAreaView>
		);
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
				No posee cuentas suficientes para realizar la operación.
			</Text>
		</View>
	) : (
		<SafeAreaView
			style={{ ...STYLES.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<ScrollView
				style={{ height: "100%" }}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text style={{ ...STYLES.subtitle, marginBottom: 0, marginTop: 15 }}>
						Cuenta origen
					</Text>
					<MoneyAccountInput
						completeBankList={bankList}
						name={fromName}
						setName={setFromName}
						currency={fromCurrency}
						setCurrency={setFromCurrency}
						ammount={fromAmmount}
						setAmmount={setFromAmmount}
						ammountIncomplete={incomplete.fromAmmount}
					/>
				</View>
				<NavigationButtons navigation={navigation} nextStep={nextStep} />
			</ScrollView>
		</SafeAreaView>
	);
};
