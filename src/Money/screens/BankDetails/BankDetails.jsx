import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { BankContext } from "../../context/BankContext";
import { COLORS } from "../../../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react/cjs/react.development";

export const BankDetails = ({ route, navigation }) => {
	const { bankId } = route.params;
	const { banks, setBanks } = useContext(BankContext);
	const currentBankPosition = banks.findIndex((bank) => bank.id == bankId);
	const currentBank = { ...banks[currentBankPosition] };
	const [selectedCurrency, setSelectedCurrency] = useState(
		currentBank.accounts[0]
	);

	const onDelete = () => {
		let banksUpdatedDelete = [...banks];
		const currentAccountPosition = banksUpdatedDelete[
			currentBankPosition
		].accounts.findIndex(
			(account) => account.currency == selectedCurrency.currency
		);

		banksUpdatedDelete[currentBankPosition].accounts.splice(
			currentAccountPosition,
			1
		);

		if (banksUpdatedDelete[currentBankPosition].accounts.length > 0) {
			setBanks([...banksUpdatedDelete]);
			setSelectedCurrency(currentBank.accounts[0]);
		} else {
			navigation.goBack();
			setBanks([...banksUpdatedDelete.filter((bank) => bank.id != bankId)]);
		}
	};

	const handleDelete = () => {
		Alert.alert(
			`Estas seguro que deseas eliminar la cuenta "${currentBank.name} ${selectedCurrency.currency}"`,
			"Esta accion no se podra deshacer",
			[
				{ text: "Cancelar", style: "cancel" },
				{ text: "Confirmar", onPress: onDelete },
			]
		);
	};

	return (
		<View style={styles.screenContainer}>
			<View style={styles.row}>
				<Text style={styles.title}>{currentBank.name}</Text>
				<Pressable
					onPress={() =>
						navigation.push("BankForm", {
							insideBank: bankId,
							isNewCurrency: true,
						})
					}
				>
					<Text style={styles.addAccountText}>Añadir moneda</Text>
				</Pressable>
			</View>
			<View style={styles.currencyContainer}>
				{currentBank.accounts.map((account, key) => (
					<Pressable
						key={key}
						onPress={() => setSelectedCurrency(account)}
						style={{
							...styles.currencyBox,
							...(selectedCurrency.currency == account.currency &&
								styles.selected),
						}}
					>
						<Text
							style={{
								...styles.bankListInfo,
								fontWeight: "bold",
								...(selectedCurrency.currency == account.currency &&
									styles.selectedText),
							}}
						>
							{account.ammount} {account.currency}
						</Text>
						{selectedCurrency.currency == account.currency && (
							<Pressable onPress={handleDelete}>
								<Ionicons
									name="close-circle"
									size={25}
									color={COLORS.lightGray}
								/>
							</Pressable>
						)}
					</Pressable>
				))}
			</View>
			<Text style={styles.subtitle}>Detalles</Text>
			<View style={styles.row}>
				<Text style={styles.text}>Cuenta de {selectedCurrency.category}</Text>
				<Pressable
					onPress={() =>
						navigation.push("BankForm", {
							insideBank: bankId,
							isNewCurrency: true,
						})
					}
					//Picker
				>
					<Text style={styles.addAccountText}>Cambiar</Text>
				</Pressable>
			</View>
			{/* Operaciones */}
			<Text style={styles.subtitle}>Operaciones</Text>
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
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontWeight: "bold",
		fontSize: 28,
		color: COLORS.titleScreen,
	},
	deleteBank: {
		borderColor: COLORS.deleteRed,
		backgroundColor: "#ffffff",
		borderWidth: 2,
		borderRadius: 10,
		height: 40,
		width: "40%",
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
	},
	addAccountText: {
		color: COLORS.primary,
		fontSize: 15,
		fontWeight: "bold",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.primary,
	},
	currencyContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	currencyBox: {
		borderRadius: 10,
		borderWidth: 3,
		borderColor: COLORS.backgroundItem,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.backgroundItem,
		marginTop: 10,
		paddingHorizontal: 10,
		paddingVertical: 15,
		width: "49%",
		flexGrow: 0,
	},
	bankListInfo: {
		fontSize: 20,
		color: COLORS.textScreen,
	},
	selected: {
		borderColor: COLORS.primary,
		backgroundColor: "#fff",
	},
	selectedText: {
		color: COLORS.primary,
	},
	subtitle: {
		fontWeight: "bold",
		fontSize: 24,
		color: COLORS.textScreen,
		marginTop: 20,
	},
	text: {
		fontSize: 15,
		color: COLORS.textScreen,
	},
});
