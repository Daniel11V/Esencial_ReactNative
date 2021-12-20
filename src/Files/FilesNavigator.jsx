import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { FilesHome } from "./screens/FilesHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const FilesNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="FilesHome">
				<Stack.Screen
					name="FilesHome"
					component={FilesHome}
					options={{ title: "Esencial - Mis Archivos" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
