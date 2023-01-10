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
import { useState } from "react";
import { useEffect } from "react";

export const Favourites = ({ navigation }) => {

	const {recipeList, favorites} = useSelector((state) => state.food);
	const recipeListFav = [];

	for(let i = 0; i < favorites.length; i++){
		recipeListFav.push(recipeList.filter(ids => ids.id.includes(favorites[i])).pop())
	}
	
	//  useEffect(() => {
		
	//  }, [favorites, recipeListFav, recipeList])

    return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={STYLES.boxesContainer}>
				{favorites.length >= 1 ? (recipeListFav.map((recipe, key) => (
					<Pressable
					key={key}
					onPress={() => navigation.push("Recipe", {recipeId: recipe.id})}
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
						}}>
							{recipe.name}
						</Text>
						
					</Pressable>
				))) : (<Text
					style={{
						...STYLES.bigText,
						fontWeight: "bold",
					}}>
						"no tenes recetas agregadas a favoritos"
					</Text>)}
				
        		
			</View>
			<FoodNavigation navigation={navigation} />
		</SafeAreaView>
    );
}

