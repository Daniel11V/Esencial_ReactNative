import {
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useContext, useState } from "react";

import { BankContext } from "../../context/BankContext";
import { BankList } from "../../components/BankList/BankList";

export const Banks = ({ navigation }) => {
	const { banks, setBanks } = useContext(BankContext);
	const [textInput, setTextInput] = useState("");
	const [price, setPrice] = useState(null);

	const onAdd = () => {
		Keyboard.dismiss();
		setTextInput("");
		setPrice("");
		setBanks([
			...banks,
			{
				id: banks.length > 0 ? banks[banks.length - 1].id + 1 : 1,
				name: textInput,
				price: price,
			},
		]);
	};

	return (
		<SafeAreaView style={{ flex: 1 }} forceInset="top">
			<View style={styles.container}>
				<ScrollView
					style={styles.nuevaCuenta}
					keyboardShouldPersistTaps="handled"
				>
					<Text style={styles.title}>Nueva Cuenta</Text>

					<TextInput
						placeholder="Nombre de cuenta"
						style={styles.nuevaCuentaInput}
						maxLength={15}
						selectionColor="#1976D2"
						value={textInput}
						onChangeText={(text) => setTextInput(text)}
					/>
					<TextInput
						placeholder="$0"
						style={styles.nuevaCuentaInput}
						maxLength={10}
						selectionColor="#1976D2"
						value={price}
						onChangeText={(newPrice) => setPrice(newPrice)}
					/>
					<Pressable onPress={onAdd} style={styles.nuevaCuentaSubmit}>
						<Text style={styles.nuevaCuentaSubmitText}>Añadir</Text>
					</Pressable>
				</ScrollView>

				<View style={styles.bankList}>
					<Text style={styles.title}>Mis Cuentas</Text>
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
	container: {
		margin: 30,
	},
	title: {
		fontWeight: "bold",
		fontSize: 28,
		color: "rgba(0, 0, 0, 0.8)",
	},
	nuevaCuenta: {},
	nuevaCuentaTitle: {},
	nuevaCuentaInput: {
		marginTop: 20,
		marginBottom: 10,
		fontSize: 20,
		borderBottomWidth: 2,
		borderBottomColor: "#1976D2",
	},
	nuevaCuentaSubmit: {
		marginTop: 20,
		backgroundColor: "#1976D2",
		borderRadius: 10,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		elevation: 6,
	},
	nuevaCuentaSubmitText: {
		color: "#fff",
		fontWeight: "bold",
	},
	bankList: {
		marginTop: 30,
	},
});
