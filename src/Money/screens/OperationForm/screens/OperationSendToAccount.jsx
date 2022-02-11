import React, { useContext, useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import { STYLES } from "../../../../../constants/styles";
import { NavigationButtons } from "../components/NavigationButtons";
import { OperationFormContext } from "../context/OperationFormContextProvider";
import { useSelector } from "react-redux";
import { MoneyAccountInput } from "../components/MoneyAccountInput";

export const OperationSendToAccount = ({ navigation, route }) => {
	const { fromName, fromCurrency, fromAmmount } = route.params;

	const {
		sendToName,
		setSendToName,
		sendToCurrency,
		setSendToCurrency,
		sendToAmmount,
		setSendToAmmount,
	} = useContext(OperationFormContext);

	const bankList = useSelector((state) => state.money.currentRegister.banks);
	const [enoughAccounts, setEnoughAccounts] = useState(false);
	const [loading, setLoading] = useState(true);

	const [incomplete, setIncomplete] = useState({
		sendToAmmount: false,
	});

	useEffect(() => {
		if (bankList) {
			let areEnoughAccounts = fromName.length
				? true
				: Object.keys(bankList).length > 0;

			setEnoughAccounts(areEnoughAccounts);
			setLoading(false);
		}
	}, [bankList]);

	const nextStep = () => {
		Keyboard.dismiss();

		if (sendToAmmount > 0) {
			navigation.push("OperationFormDetails");
		} else {
			setIncomplete({
				sendToAmmount: !(Number(sendToAmmount) > 0),
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
						Cuenta destino
					</Text>
					<MoneyAccountInput
						completeBankList={bankList}
						fromName={fromName}
						fromCurrency={fromCurrency}
						fromAmmount={fromAmmount}
						name={sendToName}
						setName={setSendToName}
						currency={sendToCurrency}
						setCurrency={setSendToCurrency}
						ammount={sendToAmmount}
						setAmmount={setSendToAmmount}
						ammountIncomplete={incomplete.sendToAmmount}
						isIncome
					/>
				</View>
				<NavigationButtons navigation={navigation} nextStep={nextStep} />
			</ScrollView>
		</SafeAreaView>
	);
};
