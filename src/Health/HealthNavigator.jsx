import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { HealthHome } from "./screens/HealthHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const HealthNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="HealthHome">
				<Stack.Screen
					name="HealthHome"
					component={HealthHome}
					options={{ title: "Esencial - Mi Salud" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
