import { NavigationContainer } from "@react-navigation/native";
import { NextHome } from "./screens/NextHome";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const NextNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="NextHome">
				<Stack.Screen
					name="NextHome"
					component={NextHome}
					options={{ title: "Esencial - Reloj" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
