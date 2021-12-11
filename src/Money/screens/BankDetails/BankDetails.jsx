import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { BankContext } from "../../context/BankContext";

export const BankDetails = ({ route, navigation }) => {
	const { bankId } = route.params;
	const { banks, setBanks } = useContext(BankContext);
	const currentBank = banks.filter((bank) => bank.id == bankId);
	console.log(currentBank);
	const { name, price } = currentBank[0];

	const onDelete = () => {
		navigation.goBack();
		setBanks(banks.filter((bank) => bank.id != bankId));
	};

	const handleDelete = () => {
		Alert.alert(
			"Estas seguro que deseas eliminar la cuenta",
			"Esta accion no se podra deshacer",
			[
				{ text: "Cancelar", style: "cancel" },
				{ text: "Confirmar", onPress: onDelete },
			]
		);
	};

	return (
		<View style={styles.screenContainer}>
			<View style={styles.header}>
				<Text style={styles.title}>{name}</Text>
				<Pressable onPress={handleDelete} style={styles.deleteBank}>
					<Text style={styles.deleteBankText}>Eliminar Cuenta</Text>
				</Pressable>
			</View>
			<Text style={{ ...styles.bankListInfo, fontWeight: "bold" }}>
				{price} ARS
			</Text>
			{/* Operaciones */}
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontWeight: "bold",
		fontSize: 28,
		color: "rgba(0, 0, 0, 0.8)",
	},
	deleteBank: {
		borderColor: "red",
		backgroundColor: "#fff",
		borderWidth: 2,
		borderRadius: 10,
		height: 40,
		width: "40%",
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
	},
	deleteBankText: {
		color: "red",
		fontSize: 15,
		fontWeight: "bold",
	},
	bankListInfo: {
		fontSize: 20,
		color: "rgba(0,0,0,0.6)",
	},
});
