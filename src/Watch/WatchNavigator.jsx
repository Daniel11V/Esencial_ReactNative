import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { WatchHome } from "./screens/WatchHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const WatchNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="WatchHome">
				<Stack.Screen
					name="WatchHome"
					component={WatchHome}
					options={{ title: "Esencial - Reloj" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
