import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import {
	Text,
	Pressable,
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
	View,
	Image,
} from "react-native";
import { STYLES } from "../constants/styles";
import { COLORS } from "../constants/colors";
import { StatusBar } from "expo-status-bar";

import * as Google from "expo-google-app-auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/user.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginBackgroundImg from "../assets/login-background.png";

const LoginScreen = () => {
	const dispatch = useDispatch();
	const [googleLoading, setGoogleLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	const handleMessage = (message, type = "FAILED") => {
		setMessage(message);
		setMessageType(type);
	};

	const handleGoogleSigninBtn = () => {
		setGoogleLoading(true);

		const config = {
			androidClientId:
				"630395241807-0jfj7kdh37518rl8rer30n26tv6e0kg9.apps.googleusercontent.com",
			iosClientId:
				"630395241807-5a798la0t7ot29iqqbhk6hd8mgb0qlev.apps.googleusercontent.com",
			iosStandaloneAppClientId:
				"630395241807-pa30r6sthtblp02um0i0hfg76k64m2aq.apps.googleusercontent.com",
			androidStandaloneAppClientId:
				"630395241807-fkjpsql0drpt0988uh56pkrd07okcukj.apps.googleusercontent.com",
			scopes: ["profile", "email"],
		};

		Google.logInAsync(config)
			.then((result) => {
				const { type, user, accessToken } = result;
				if (type == "success") {
					const { id, email, name, photoUrl } = user;
					handleMessage("Inicio de sesion exitoso. Cargando...", "SUCCESS");
					persistLogin(
						{ id, email, name, photoUrl, accessToken },
						message,
						"SUCCESS"
					);
				} else {
					handleMessage("Inicio de sesion cancelado.");
				}
				setGoogleLoading(false);
			})
			.catch((error) => {
				console.log(error);
				handleMessage(
					"Ocurrio un error. Comprueba tu conexión a internet e intenta de nuevo."
				);
				setGoogleLoading(false);
			});
	};

	const persistLogin = (credentials, message, status) => {
		AsyncStorage.setItem("esencialCredentials", JSON.stringify(credentials))
			.then(() => {
				handleMessage(message, status);
				dispatch(login(credentials));
			})
			.catch((error) => {
				console.log(error);
				handleMessage("Error al guardar datos, reintente...");
			});
	};

	return (
		<View forceInset="top" style={{ flex: 1, justifyContent: "flex-end" }}>
			<View
				style={{
					flex: 1,
					maxWidth: "100%",
					backgroundColor: COLORS.backgroundScreen,
					marginBottom: -30,
					marginLeft: -1,
				}}
			>
				<Image
					source={loginBackgroundImg}
					style={{
						resizeMode: "contain",
						width: "120%",
						alignSelf: "center",
						maxHeight: "100%",
					}}
				/>
			</View>
			<SafeAreaView
				style={{
					...STYLES.screenContainer,
					alignItems: "center",
					minHeight: 0,
					backgroundColor: "#fff",
					maxHeight: 400,
					paddingBottom: 25,
					elevation: 15,
				}}
			>
				<Text style={styles.esencial}>ESENCIAL</Text>
				<Text style={styles.description}>
					Gestiona tus distintas cuentas en un solo lugar y lleva tus finanzas
					personales al proximo nivel 🚀
				</Text>
				<Text
					style={{
						...styles.message,
						...(messageType === "FAILED"
							? { color: "red" }
							: { color: "green" }),
					}}
				>
					{message}
				</Text>
				<Pressable
					onPress={() => handleGoogleSigninBtn()}
					style={styles.logBtn}
				>
					{googleLoading ? (
						<ActivityIndicator
							size="large"
							color="#fff"
							style={{ marginVertical: 10.5 }}
						/>
					) : (
						<Text style={styles.logBtnText}>Iniciar Sesion con Google</Text>
					)}
				</Pressable>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	esencial: {
		fontSize: 35,
		fontWeight: "100",
		letterSpacing: 5,
		color: "rgba(0,0,0,0.65)",
		marginTop: 30,
		marginBottom: 15,
	},
	description: {
		fontSize: 18,
		fontWeight: "100",
		letterSpacing: 2,
		lineHeight: 30,
		color: "rgba(0,0,0,0.65)",
		textAlign: "center",
		marginBottom: 50,
	},
	message: {
		fontSize: 12,
		fontWeight: "100",
		color: "rgba(0,0,0,0.65)",
		textAlign: "center",
		marginBottom: 5,
		fontStyle: "italic",
	},
	logBtn: {
		width: "100%",
		alignItems: "center",
		backgroundColor: COLORS.primary,
		borderRadius: 20,
		marginBottom: 10,
		position: "relative",
		elevation: 2,
	},
	logBtnText: {
		marginVertical: 15,
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
	},
});

export const LoginNavigator = ({ asyncData }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const Stack = createNativeStackNavigator();

	useEffect(() => {
		if (asyncData.id?.length) {
			dispatch(login(asyncData));
		}
	}, [asyncData]);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="LoginScreen"
				screenOptions={{ headerShown: false }}
			>
				{user.id.length ? (
					<Stack.Screen name="TabNavigator" component={TabNavigator} />
				) : (
					<Stack.Screen name="LoginScreen" component={LoginScreen} />
				)}
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
};
