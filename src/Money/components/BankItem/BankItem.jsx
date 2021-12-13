import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../../../constants/colors";
import React from "react";

export const BankItem = ({ bankInfo, handleClickBank, simplified }) => {
	return (
		<TouchableOpacity
			style={{
				...styles.bankListItem,
				flexDirection: simplified ? "row" : "column",
			}}
			onPress={() => handleClickBank(bankInfo.id)}
		>
			<Text style={{ ...styles.bankListInfo, alignSelf: "flex-start" }}>
				{bankInfo.name}
			</Text>
			<View style={{ alignSelf: "flex-start" }}>
				{bankInfo.accounts.map((account, key) => (
					<Text
						key={key}
						style={{
							...styles.bankListInfo,
							fontWeight: "bold",
							alignSelf: simplified ? "flex-end" : "flex-start",
						}}
					>
						{account.ammount} {account.currency}
					</Text>
				))}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	bankListItem: {
		borderRadius: 10,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.backgroundItem,
		marginTop: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	bankListInfo: {
		fontSize: 20,
		color: COLORS.infoItem,
	},
});
