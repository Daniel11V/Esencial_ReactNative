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

export const Favourites = ({ navigation }) => {
	const {favorites} = useSelector((state) => state.food);
    return (<View forceInset="top">
		<SafeAreaView style={{ flex: 1 }}>
			<View style={STYLES.boxesContainer}>
				{favorites.map((recipe, key) => (
					<Pressable
					key={key}
					onPress={() => navigation.push("Recipe", {recipe})}
					>
						<text>
							{recipe.name}
						</text>
					</Pressable>
				))}
        		<FoodNavigation navigation={navigation} />
			</View>
		</SafeAreaView>
    </View>);
}

