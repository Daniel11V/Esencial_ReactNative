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

// import * as Google from "expo-google-app-auth";
import * as GoogleSignIn from "expo-google-sign-in";
import {
	initializeAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../store/actions/user.action";
import loginBackgroundImg from "../assets/login-background.png";
import { firebaseApp } from "../database/firebase";

const FirebaseAuth = async (email, password) => {
	try {
		const auth = getAuth();
		// const auth = initializeAuth(firebaseApp, {
		// 	persistence: getReactNativePersistence(AsyncStorage),
		// });

		const res = await FirebaseLogin(auth, email, password);

		if (res.type === "error") {
			await FirebaseSignIn(auth, email, password);

			const res2 = await FirebaseLogin(auth, email, password);
			if (res2.type === "error")
				throw new Error(`Second Login Fail - ${res2.error}`);
		}
	} catch (error) {
		console.log("FirebaseAuth: fail");
		throw new Error(error);
	}
};

const FirebaseLogin = async (auth, email, password) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		// const user = userCredential.user;
		//console.log("FirebaseLogin: successful");
		return { type: "success", data: response };
	} catch (error) {
		//console.log("FirebaseLogin: fail");
		//console.log(error.code, error.message);
		return { type: "error", error };
	}
};

const FirebaseSignIn = async (auth, email, password) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		//console.log("FirebaseSignIn: successful");
	} catch (error) {
		//console.warn("FirebaseSignIn: fail");
		//console.warn(error.code, error.message);
		throw new Error(error);
	}
};

const LoginScreen = () => {
	const dispatch = useDispatch();
	const [googleLoading, setGoogleLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	useEffect(() => {
		let isMounted = true;

		const config = {
			androidClientId:
				"630395241807-0jfj7kdh37518rl8rer30n26tv6e0kg9.apps.googleusercontent.com",
			iosClientId:
				"630395241807-5a798la0t7ot29iqqbhk6hd8mgb0qlev.apps.googleusercontent.com",
			androidStandaloneAppClientId:
				"630395241807-m9q2h9vb4pntte8orbgm6qt373p6pnj8.apps.googleusercontent.com",
			iosStandaloneAppClientId:
				"630395241807-pa30r6sthtblp02um0i0hfg76k64m2aq.apps.googleusercontent.com",
			clientId:
				"630395241807-m9q2h9vb4pntte8orbgm6qt373p6pnj8.apps.googleusercontent.com",
			scopes: ["profile", "email"],
		};

		// BEFORE with expo-google-app-auth

		// const config = {
		// 	androidClientId:
		// 		"630395241807-0jfj7kdh37518rl8rer30n26tv6e0kg9.apps.googleusercontent.com",
		// 	iosClientId:
		// 		"630395241807-5a798la0t7ot29iqqbhk6hd8mgb0qlev.apps.googleusercontent.com",
		// 	iosStandaloneAppClientId:
		// 		"630395241807-pa30r6sthtblp02um0i0hfg76k64m2aq.apps.googleusercontent.com",
		// 	androidStandaloneAppClientId:
		// 		"630395241807-fkjpsql0drpt0988uh56pkrd07okcukj.apps.googleusercontent.com",
		// 	scopes: ["profile", "email"],
		// };

		GoogleSignIn.initAsync(config);

		return () => {
			isMounted = false;
		};
	}, []);

	const handleMessage = (message, type = "FAILED") => {
		setMessage(message);
		setMessageType(type);
	};

	const syncUserWithStateAsync = async () => {
		const user = await GoogleSignIn.signInSilentlyAsync();
		if (user) {
			const { uid, email, displayName, photoURL, auth } = user;
			persistLogin(
				{
					id: uid,
					accessToken: auth.accessToken,
					email,
					name: displayName,
					photoUrl: photoURL,
				},
				message,
				"SUCCESS"
			);
		}
	};

	const manualLogin = async () => {
		setGoogleLoading(true);

		try {
			await GoogleSignIn.askForPlayServicesAsync();
			const { type, user } = await GoogleSignIn.signInAsync();
			const { email, uid } = user;
			console.log("user: ", user);
			if (type === "success") {
				console.log("GoogleAuth: successful");

				await FirebaseAuth(email, uid);
				console.log("FirebaseAuth: successful");

				handleMessage("Inicio de sesion exitoso. Cargando...", "SUCCESS");
				await syncUserWithStateAsync();

				console.log("ManualLogin: successful");
			} else {
				handleMessage("Inicio de sesion cancelado.");
				console.log("GoogleAuth: fail");
			}
			setGoogleLoading(false);
		} catch (error) {
			console.log("ManualLogin: error - ", error);
			handleMessage(
				"Ocurrio un error. Comprueba tu conexión a internet e intenta de nuevo."
			);
			setGoogleLoading(false);
		}
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
				<Pressable onPress={() => manualLogin()} style={styles.logBtn}>
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

export const LoginNavigator = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const Stack = createNativeStackNavigator();

	const [appReady, setAppReady] = useState(false);

	const autoLogin = async () => {
		try {
			const result = await AsyncStorage.getItem("esencialCredentials");
			if (result === null) {
				console.log("AsyncStorage: no data");
				throw new Error();
			}
			console.log("AsyncStorage: success");

			const { email, id } = JSON.parse(result);
			await FirebaseAuth(email, id);
			console.log("FirebaseAuth: success");

			dispatch(login(JSON.parse(result)));
			console.log("AutoLogin: success");
		} catch (error) {
			dispatch(login({ id: "" }));
			console.log("AutoLogin: fail");
		}
	};

	if (!appReady || !user.id.localeCompare("0")) {
		return (
			<AppLoading
				startAsync={autoLogin}
				onFinish={() => setAppReady(true)}
				onError={console.warn}
			/>
		);
	}

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
