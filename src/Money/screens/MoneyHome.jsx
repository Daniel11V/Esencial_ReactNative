import React, { useEffect } from "react";
import { Pressable, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { STYLES } from "../../../constants/styles";
import { BankList } from "../components/BankList/BankList";

import { getBanks } from "../../../store/actions/bank.action";
import { useDispatch } from "react-redux";
import { getOperations } from "../../../store/actions/operation.action";
import { OperationList } from "../components/OperationList/OperationList";

export const MoneyHome = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBanks());
		//dispatch(getOperations());
	}, []);

	return (
		<View style={{ width: "100%" }}>
			<ScrollView style={STYLES.screenContainer}>
				<View style={{ marginBottom: 120 }}>
					{/* Cuentas de uso diario */}
					<Text style={STYLES.smalltitle}>Cuentas de uso diario</Text>
					<BankList
						handleClickBank={(bankName) =>
							navigation.push("BankDetails", { bankName })
						}
						simplified={true}
					/>
					<Pressable
						onPress={() => navigation.push("Banks")}
						style={STYLES.btnSecondary}
					>
						<Text style={STYLES.btnSecondaryText}>Ver todas...</Text>
					</Pressable>
					{/* Actividad Reciente */}
					<Text style={{ ...STYLES.smalltitle, marginTop: 10 }}>
						Actividad Reciente
					</Text>
					{/* <OperationList
						handleClickBank={
							(bankName) => navigation.push("BankDetails", { bankName }) ////
						}
						showOnlyThree={false}
					/> */}
					<Pressable
						onPress={() => navigation.push("Banks")}
						style={STYLES.btnSecondary}
					>
						<Text style={STYLES.btnSecondaryText}>Ver todas...</Text>
					</Pressable>

					{/* Registrar Operacion */}
				</View>
			</ScrollView>
			<LinearGradient
				colors={["transparent", "#ffffff"]}
				style={STYLES.actionBoxFixed}
			>
				<Pressable
					onPress={() => navigation.push("Banks")}
					style={{ ...STYLES.btnPrimary, borderRadius: 50 }}
				>
					<Text style={STYLES.btnPrimaryText}>Realizar operación</Text>
				</Pressable>
			</LinearGradient>
		</View>
	);
};
