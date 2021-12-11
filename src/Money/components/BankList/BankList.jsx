import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";

import { BankContext } from "../../context/BankContext";
import { BankItem } from "../BankItem/BankItem";

export const BankList = ({ handleClickBank }) => {
	const { banks } = useContext(BankContext);

	return (
		<FlatList
			data={banks}
			style={styles.bankListStyle}
			renderItem={(data) => (
				<BankItem bankInfo={data.item} handleClickBank={handleClickBank} />
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
