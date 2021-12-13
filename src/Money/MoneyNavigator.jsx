import { BankDetails } from "./screens/BankDetails/BankDetails";
import { BankForm } from "./screens/BankForm/BankForm";
import { BankProvider } from "./context/BankContext";
import { Banks } from "./screens/Banks/Banks";
import { MoneyHome } from "./screens/MoneyHome";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const MoneyNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<BankProvider>
			<NavigationContainer independent={true}>
				<Stack.Navigator initialRouteName="MoneyScreen">
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
					/>
					<Stack.Screen
						name="BankForm"
						component={BankForm}
						initialParams={{ insideBank: null, isNewCurrency: false }}
						options={({ route }) => ({
							title: route.params.isNewCurrency
								? "Añadir Moneda"
								: "Añadir Cuenta",
						})}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</BankProvider>
	);
};
