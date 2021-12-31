import React from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import userLogoDefault from "../../../assets/user-img-login.png";
import { COLORS } from "../../../constants/colors";
import { STYLES } from "../../../constants/styles";
import { logout } from "../../../store/actions/user.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as GoogleSignIn from "expo-google-sign-in";

export const UserHome = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

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
});
