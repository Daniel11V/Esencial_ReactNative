import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { BankList } from "../../components/BankList/BankList";
import { COLORS } from "../../../../constants/colors";
import React from "react";

export const Banks = ({ navigation }) => {
	return (
		<SafeAreaView
			style={{ ...styles.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<View>
				<View style={styles.bankList}>
					<View style={styles.btnsContainer}>
						<Pressable
							onPress={() => navigation.push("BankForm")}
							style={styles.btnsBox}
						>
							<Text style={styles.btnsText}>Saldo Total</Text>
						</Pressable>
						<Pressable
							onPress={() => navigation.push("BankForm")}
							style={styles.btnsBox}
						>
							<Text style={styles.btnsText}>Añadir cuenta</Text>
						</Pressable>
					</View>
					<BankList
						handleClickBank={(bankId) =>
							navigation.push("BankDetails", { bankId: bankId })
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		padding: 20,
		width: "100%",
		minHeight: "100%",
		backgroundColor: COLORS.backgroundScreen,
	},
	btnsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	btnsBox: {
		borderRadius: 10,
		borderWidth: 3,
		borderColor: COLORS.primary,
		backgroundColor: "#fff",
		width: "49%",
		flexGrow: 0,
		paddingVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	btnsText: {
		fontSize: 15,
		color: COLORS.primary,
		fontWeight: "bold",
	},
});
