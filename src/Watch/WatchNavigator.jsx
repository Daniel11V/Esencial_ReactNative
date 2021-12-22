import React from "react";
import { WatchHome } from "./screens/WatchHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const WatchNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="WatchHome">
			<Stack.Screen
				name="WatchHome"
				component={WatchHome}
				options={{ title: "Esencial - Mi Reloj" }}
			/>
		</Stack.Navigator>
	);
};
