import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FoodHome } from "./screens/FoodHome";
import { Calendar } from "./screens/calendar";
import { Favourites } from "./screens/favourites";
import { FoodSelection } from "./screens/FoodSelection";
import { Recipe } from "./screens/Recipe";

export const FoodNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="FoodHome">
			<Stack.Screen
				name="FoodHome"
				component={FoodHome}
				options={{ title: "Esencial - Mis Comidas" }}
			/>
			<Stack.Screen
				name="Favorite"
				component={Favourites}
				options={{ title: "Mi cocina" }}
			/>
			<Stack.Screen
				name="calendarNavigator"
				component={Calendar}
				options={{ title: "Calendario de comidas" }}
			/>
			<Stack.Screen
				name="FoodSelection"
				component={FoodSelection}
				options={{ title: "Mi cocina" }}
			/>
			<Stack.Screen
				name="Recipe"
				component={Recipe}
				options={{ title: "Recipe" }}
			/>
		</Stack.Navigator>

	);
};
