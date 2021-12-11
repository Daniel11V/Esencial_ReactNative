import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";

export const BankItem = ({ bankInfo, handleClickBank }) => {
	return (
		<TouchableOpacity
			style={styles.bankListItem}
			onPress={() => handleClickBank(bankInfo.id)}
		>
			<Text style={styles.bankListInfo}>{bankInfo.name}</Text>
			<Text style={{ ...styles.bankListInfo, fontWeight: "bold" }}>
				{bankInfo.price} ARS
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	bankListItem: {
		// width: "90%",
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.05)",
		marginTop: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	bankListInfo: {
		fontSize: 20,
		color: "rgba(0,0,0,0.6)",
	},
});
