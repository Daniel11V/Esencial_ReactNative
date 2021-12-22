import { BankDetails } from "./screens/BankDetails/BankDetails";
import { BankForm } from "./screens/BankForm/BankForm";
import { Banks } from "./screens/Banks/Banks";
import { MoneyHome } from "./screens/MoneyHome";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OperationDetails } from "./screens/OperationDetails/OperationDetails";
import { Operations } from "./screens/Operations/Operations";
import { OperationForm } from "./screens/OperationForm/OperationForm";

export const MoneyNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="MoneyHome">
			<Stack.Screen
				name="MoneyHome"
				component={MoneyHome}
				options={{ title: "Esencial - Mis Finanzas" }}
			/>
			<Stack.Screen
				name="Banks"
				component={Banks}
				options={{ title: "Mis Cuentas" }}
			/>
			<Stack.Screen
				name="BankDetails"
				component={BankDetails}
				options={{ title: "Detalle de Cuentas" }}
				initialParams={{ bankName: "Efectivo", hasNewCurrency: null }}
			/>
			<Stack.Screen
				name="BankForm"
				component={BankForm}
				initialParams={{ insideBank: null, isNewCurrency: false }}
				options={({ route }) => ({
					title: route.params.isNewCurrency ? "Añadir Moneda" : "Añadir Cuenta",
				})}
			/>
			<Stack.Screen
				name="Operations"
				component={Operations}
				options={{ title: "Historial de Operaciones" }}
			/>
			<Stack.Screen
				name="OperationDetails"
				component={OperationDetails}
				options={{ title: "Detalle de Operación" }}
				initialParams={{ operationId: null }}
			/>
			<Stack.Screen
				name="OperationForm"
				component={OperationForm}
				options={{ title: "Realizar Operación" }}
			/>
		</Stack.Navigator>
	);
};
