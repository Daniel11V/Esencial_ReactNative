import { FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";

import { BankContext } from "../../context/BankContext";
import { BankItem } from "../BankItem/BankItem";

export const BankList = ({ handleClickBank, simplified = false }) => {
	const { banks } = useContext(BankContext);

	const simplifiedBanks = () => {
		let banksUpdatedAccounts = banks.map((bank) => ({
			...bank,
			accounts: bank.accounts.filter(
				(account) => account.category === "uso diario"
			),
		}));

		return banksUpdatedAccounts.filter((bank) => bank.accounts.length > 0);
	};

	return (
		<FlatList
			data={simplified ? simplifiedBanks() : banks}
			style={styles.bankListStyle}
			renderItem={(data) => (
				<BankItem
					bankInfo={data.item}
					handleClickBank={handleClickBank}
					simplified={simplified}
				/>
			)}
			keyExtractor={(item) => item.id}
		/>
	);
};

const styles = StyleSheet.create({
	bankListStyle: {
		width: "100%",
		flexGrow: 0,
	},
});
