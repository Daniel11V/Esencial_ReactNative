import React from "react";
import { Pressable,
	Text,
	View } from "react-native";
import { STYLES } from "../../../constants/styles";
import { COLORS } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { FOOD_LABELS } from "../../../constants/foodConstants";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodNavigation } from "../components/FoodNavigation";

export const FoodHome = ({ navigation }) => {
	const labels = FOOD_LABELS;
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={STYLES.boxesContainer}>
				{labels.map((label, index) => (
					<Pressable
						key={index}
						onPress={() => navigation.push("FoodSelection", {label:label.name})}
						style={{
							paddingHorizontal: 12,
							paddingVertical: 12,
							justifyContent: "space-between",
						}}
					>
						
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
							}}
						>
							{label.name} 
						</Text>
					</Pressable>
				))}
			</View>
			<FoodNavigation navigation={navigation} />
		</SafeAreaView>
	);
};
