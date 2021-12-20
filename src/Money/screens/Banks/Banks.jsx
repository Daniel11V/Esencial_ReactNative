import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";

import { BankList } from "../../components/BankList/BankList";
import React from "react";
import { useSelector } from "react-redux";
import { STYLES } from "../../../../constants/styles";

export const Banks = ({ navigation }) => {
	const banks = useSelector((state) => state.money.banks);

	const openBalance = () => {
		let totalCurrencies = [];
		let totalCurrenciesString = "";

		if (Object.values(banks).length) {
			Object.values(banks).map((bank) => {
				Object.values(bank.accounts).map((account) => {
					const currencyPosition = totalCurrencies.findIndex(
						(curr) => curr.name === account.currency
					);

					if (currencyPosition >= 0) {
						totalCurrencies[currencyPosition].total += account.ammount;
					} else {
						totalCurrencies.push({
							name: account.currency,
							total: account.ammount,
						});
					}
				});
			});

			totalCurrencies.map((currency, id) => {
				if (id) {
					totalCurrenciesString += `\n${currency.name}:  ${currency.total}`;
				} else {
					totalCurrenciesString += `${currency.name}:  ${currency.total}`;
				}
			});
		} else {
			totalCurrenciesString = "Ninguna cuenta registrada...";
		}

		Alert.alert("Saldo Total", totalCurrenciesString, [{ text: "Listo" }]);
	};

	return (
		<SafeAreaView
			style={{ ...STYLES.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<View style={STYLES.boxesContainer}>
				<Pressable onPress={openBalance} style={STYLES.btnSecondaryMiddle}>
					<Text style={STYLES.btnSecondaryText}>Saldo Total</Text>
				</Pressable>
				<Pressable
					onPress={() => navigation.push("BankForm")}
					style={{
						...STYLES.btnSecondaryMiddle,
					}}
				>
					<Text style={STYLES.btnSecondaryText}>Añadir cuenta</Text>
				</Pressable>
			</View>
			<BankList
				handleClickBank={(bankName) =>
					navigation.push("BankDetails", { bankName })
				}
			/>
		</SafeAreaView>
	);
};
