import React from "react";
import { FilesHome } from "./screens/FilesHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const FilesNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="FilesHome">
			<Stack.Screen
				name="FilesHome"
				component={FilesHome}
				options={{ title: "Esencial - Mis Archivos" }}
			/>
		</Stack.Navigator>
	);
};
