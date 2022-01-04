import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import userLogoDefault from "../../../assets/user-img-login.png";
import { COLORS } from "../../../constants/colors";
import { STYLES } from "../../../constants/styles";
import { logout } from "../../../store/actions/user.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Updates from "expo-updates";

export const UserHome = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [updateAvailable, setUpdateAvailable] = useState(false);

	const fetchUpdate = async () => {
		try {
			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				setUpdateAvailable(true);
			}
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		fetchUpdate();
	}, []);

	const handleLogout = () => {
		AsyncStorage.removeItem("esencialCredentials")
			.then(() => {
				dispatch(logout());
				GoogleSignIn.signOutAsync();
			})
			.catch((error) => console.log(error));
	};

	return (
		<View
			forceInset="top"
			style={{
				...STYLES.screenContainer,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Image
				style={styles.userImg}
				source={user.photoUrl ? { uri: user.photoUrl } : userLogoDefault}
			/>
			<Text>{user.name ? user.name : "Nombre"}</Text>
			<Text>{user.email ? user.email : "Email"}</Text>
			<TouchableOpacity onPress={handleLogout} style={styles.logBtn}>
				<Text style={styles.logBtnText}>Cerrar Sesion</Text>
			</TouchableOpacity>
			<View
				style={{
					position: "absolute",
					bottom: 15,
					alignSelf: "center",
				}}
			>
				<View style={{ alignItems: "center" }}>
					{updateAvailable && (
						<TouchableOpacity onPress={() => Updates.reloadAsync()}>
							<Text
								style={{
									...STYLES.normalText,
									...styles.linkText,
								}}
							>
								Nueva actualización disponible
							</Text>
						</TouchableOpacity>
					)}
					<Text
						style={{
							...STYLES.normalText,
							...styles.versionText,
						}}
					>
						Version {Updates.updateId ? Updates.updateId : "..."}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userImg: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	logBtn: {
		paddingVertical: 10,
		paddingHorizontal: 40,
		backgroundColor: COLORS.primary,
		borderRadius: 20,
		marginTop: 20,
	},
	logBtnText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
	},
	versionText: {
		color: "rgba(0,0,0,0.5)",
		textAlign: "center",
		fontStyle: "italic",
	},
	linkText: {
		color: COLORS.primary,
		borderBottomColor: COLORS.primary,
		borderBottomWidth: 1,
		textAlign: "center",
		marginBottom: 10,
	},
});
