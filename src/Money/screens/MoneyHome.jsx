import React, { useEffect } from "react";
import { Pressable, Text, ScrollView, View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { STYLES } from "../../../constants/styles";
import { BankList } from "../components/BankList/BankList";

import { useDispatch, useSelector } from "react-redux";
import { getFirstView } from "../../../store/actions/money.action";
import { OperationList } from "../components/OperationList/OperationList";

export const MoneyHome = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (user.id?.length) {
			dispatch(getFirstView(user.id));
		}
	}, [user]);

	return (
		<SafeAreaView>
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
					<OperationList
						handleClickOperation={(operationId) =>
							navigation.push("OperationDetails", { operationId })
						}
						showOnlyThree={true}
					/>
					<Pressable
						onPress={() => navigation.push("Operations")}
						style={STYLES.btnSecondary}
					>
						<Text style={STYLES.btnSecondaryText}>Ver todas...</Text>
					</Pressable>
				</View>
			</ScrollView>
			{/* Registrar Operacion */}
			<LinearGradient
				colors={["transparent", "#ffffff"]}
				style={STYLES.actionBoxFixed}
			>
				<Pressable
					onPress={() => navigation.push("OperationForm")}
					style={{ ...STYLES.btnPrimary, borderRadius: 50, elevation: 4 }}
				>
					<Text style={STYLES.btnPrimaryText}>Realizar operación</Text>
				</Pressable>
			</LinearGradient>
		</SafeAreaView>
	);
};
