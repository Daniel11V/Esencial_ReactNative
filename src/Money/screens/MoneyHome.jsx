import React, { useEffect, useState } from "react";
import {
	Pressable,
	Text,
	ScrollView,
	View,
	SafeAreaView,
	Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { STYLES } from "../../../constants/styles";
import { BankList } from "../components/BankList/BankList";

import { useDispatch, useSelector } from "react-redux";
import {
	addMoneyRegister,
	deleteMoneyNotification,
	getPersonalRegisterFirstView,
	leaveMoneyRegister,
} from "../../../store/actions/money.action";
import { OperationList } from "../components/OperationList/OperationList";
import { MoneyRegister } from "../components/MoneyRegister/MoneyRegister";

export const MoneyHome = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const notifications = useSelector((state) => state.money.notifications);
	const availableRegisters = useSelector(
		(state) => state.money.availableRegisters
	);
	const [runingNotifications, setRuningNotifications] = useState(false);

	useEffect(() => {
		if (user.id?.length) {
			dispatch(getPersonalRegisterFirstView(user));
		}
	}, [user]);

	// Notification Manager
	useEffect(() => {
		const execNotifications = async (notifications) => {
			for (const notifId of Object.keys(notifications)) {
				await execNotification(notifications[notifId], notifId);
			}
		};

		if (Object.keys(notifications).length && !runingNotifications) {
			setRuningNotifications(true);
			execNotifications(notifications);
		}
		return () => setRuningNotifications(false);
	}, [notifications]);

	const execNotification = (notification, notificationId) => {
		return new Promise((resolve, reject) => {
			if (!notification.type.localeCompare("Invitation to Money Register")) {
				const description =
					notification.from.name === notification.moneyRegister.name
						? `${notification.from.name} te ha invitado a su registro de cuentas personal`
						: `${notification.from.name} te ha invitado al registro de cuentas "${notification.moneyRegister.name}"`;

				Alert.alert(
					"Nueva invitación!",
					description,
					[
						{
							text: "Rechazar",
							onPress: () => {
								dispatch(deleteMoneyNotification(notificationId));
								resolve();
							},
						},
						{
							text: "Aceptar",
							onPress: () => {
								dispatch(addMoneyRegister(notification.moneyRegister, user));
								dispatch(deleteMoneyNotification(notificationId));
								resolve();
							},
						},
					],
					{ onDismiss: () => console.log("dismiss") }
				);
			} else if (!notification.type.localeCompare("Money Register Deletion")) {
				dispatch(
					leaveMoneyRegister(
						user,
						notification.moneyRegister.id,
						availableRegisters
					)
				);

				const description = `El registro ${notification.moneyRegister.name} fue eliminado por ${notification.from.name}`;

				Alert.alert(
					"Nuevo Mensaje!",
					description,
					[
						{
							text: "Ok",
							onPress: () => {
								dispatch(deleteMoneyNotification(notificationId));
								resolve();
							},
						},
					],
					{ cancelable: true, onDismiss: () => console.log("dismiss") }
				);
			}
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={STYLES.screenContainer}>
				<View style={{ marginBottom: 120 }}>
					{/* Cambiar usuario de finanzas */}
					<MoneyRegister />
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
