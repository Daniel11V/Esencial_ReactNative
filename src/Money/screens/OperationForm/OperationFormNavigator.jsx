import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OperationTypes } from "./screens/OperationTypes";
import { OperationFromAccount } from "./screens/OperationFromAccount";
import { OperationFormDetails } from "./screens/OperationFormDetails";
import { OperationSendToAccount } from "./screens/OperationSendToAccount";
import OperationFormContextProvider from "./context/OperationFormContextProvider";

export const OperationFormNavigator = ({ navigation }) => {
	const Stack = createNativeStackNavigator();

	return (
		<OperationFormContextProvider>
			<Stack.Navigator
				initialRouteName="OperationTypes"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="OperationTypes" component={OperationTypes} />
				<Stack.Screen
					name="OperationFromAccount"
					component={OperationFromAccount}
				/>
				<Stack.Screen
					name="OperationSendToAccount"
					component={OperationSendToAccount}
				/>
				<Stack.Screen
					name="OperationFormDetails"
					component={OperationFormDetails}
				/>
			</Stack.Navigator>
		</OperationFormContextProvider>
	);
};
