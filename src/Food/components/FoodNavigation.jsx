import React from "react";
import { Pressable,	View } from "react-native";
import { STYLES } from "../../../constants/styles";
import { COLORS } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

export const FoodNavigation = ({ navigation }) => {
	return (
			<LinearGradient
				colors={["transparent", "#ffffff"]}
				style={STYLES.actionBoxFixed}
				>
				<View
					style={{ ...STYLES.btnPrimary, borderRadius: 50, elevation: 4 }}
				>
					<Pressable
						onPress={() => navigation.push("FoodHome")}
						style={{marginRight: 25}}
					>
						<Ionicons
							name="home"
							size={25}
							color={COLORS.backgroundScreen}
						/>
					</Pressable>
					<Pressable
						onPress={() => navigation.push("Favorite")}
						style={{marginRight: 25}}
					>
						<Ionicons
							name="heart"
							size={25}
							color={COLORS.backgroundScreen}
						/>
					</Pressable>
					{/* <Pressable
						onPress={() => navigation.push("calendarNavigator")}
					>
						<Ionicons
							name="calendar"
							size={25}
							color={COLORS.backgroundScreen}
						/>
					</Pressable> */}
				</View>
			</LinearGradient>
	);
};
