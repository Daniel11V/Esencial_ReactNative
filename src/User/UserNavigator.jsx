import React from "react";
import { UserHome } from "./screens/UserHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const UserNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="UserHome">
			<Stack.Screen
				name="UserHome"
				component={UserHome}
				options={{ title: "Esencial - Mi Perfil" }}
			/>
		</Stack.Navigator>
	);
};
