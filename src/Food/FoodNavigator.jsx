import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FoodHome } from "./screens/FoodHome";

export const FoodNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="FoodHome">
			<Stack.Screen
				name="FoodHome"
				component={FoodHome}
				options={{ title: "Esencial - Mis Comidas" }}
			/>
		</Stack.Navigator>
	);
};
