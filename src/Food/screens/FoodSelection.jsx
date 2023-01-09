import React, { useEffect, useState }  from "react";
import { Pressable,
	Text,
	View } from "react-native";
	import { STYLES } from "../../../constants/styles";
	import { COLORS } from "../../../constants/colors";
	import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FoodNavigation } from "../components/FoodNavigation";

export const FoodSelection = ({ route, navigation }) => {
	const {recipeList, favorites} = useSelector((state) => state.food);
	const [recipeListFiltered, setRecipeListFiltered] = useState([])
	const { label } = route.params;

	useEffect(() => {
		setRecipeListFiltered(recipeList.filter(recipe => recipe.labels.includes(label)))
	}, [label, recipeList])
	
	
	const isFavorite = (recipeId) => favorites.includes(recipeId)

	return (
	<SafeAreaView style={{ flex: 1 }}>
		<View style={STYLES.boxesContainer}>
					{recipeListFiltered.map((recipe, key) => (
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
								}}
							>
								{recipe.name} 
							</Text>
							{isFavorite(recipe.id) && (
								<Ionicons
								name="heart"
								size={25}
								color={COLORS.lightGray}
							/>
							)}
							
						</Pressable>
					))}
				</View>
				<FoodNavigation navigation={navigation} />
	</SafeAreaView>);
};
