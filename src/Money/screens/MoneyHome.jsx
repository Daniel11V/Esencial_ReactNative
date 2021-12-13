import { Pressable, StyleSheet, Text, View } from "react-native";

import { BankList } from "../components/BankList/BankList";
import { COLORS } from "../../../constants/colors";
import React from "react";

export const MoneyHome = ({ navigation }) => {
	return (
		<View style={styles.screenContainer}>
			<Text style={styles.title}>Cuentas de uso diario</Text>
			<BankList
				handleClickBank={(bankId) =>
					navigation.push("BankDetails", { bankId: bankId })
				}
				simplified={true}
			/>
			<Pressable
				onPress={() => navigation.push("Banks")}
				style={styles.nuevaCuentaSubmit}
			>
				<Text style={styles.nuevaCuentaSubmitText}>Ver todas...</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		padding: 20,
		width: "100%",
		minHeight: "100%",
		backgroundColor: COLORS.backgroundScreen,
	},
	title: {
		fontSize: 18,
		color: COLORS.titleScreen,
	},
	nuevaCuentaSubmit: {
		marginTop: 15,
		borderColor: COLORS.primary,
		backgroundColor: "#fff",
		borderWidth: 2,
		borderRadius: 10,
		paddingVertical: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	nuevaCuentaSubmitText: {
		color: COLORS.primary,
		fontSize: 16,
		fontWeight: "bold",
	},
});
