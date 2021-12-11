import { Pressable, StyleSheet, Text, View } from "react-native";

import { BankList } from "../components/BankList/BankList";
import React from "react";

export const MoneyHome = ({ navigation }) => {
	return (
		<View style={styles.screenContainer}>
			<Text style={styles.title}>Cuentas de uso diario</Text>
			<BankList
				handleClickBank={(bankId) =>
					navigation.push("BankDetails", { bankId: bankId })
				}
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
		backgroundColor: "#fafafa",
	},
	title: {
		fontSize: 18,
		color: "rgba(0, 0, 0, 0.8)",
	},
	nuevaCuentaSubmit: {
		marginTop: 20,
		borderColor: "#1976D2",
		backgroundColor: "#fff",
		borderWidth: 2,
		borderRadius: 10,
		height: 40,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
	},
	nuevaCuentaSubmitText: {
		color: "#1976D2",
		fontSize: 15,
		fontWeight: "bold",
	},
});
