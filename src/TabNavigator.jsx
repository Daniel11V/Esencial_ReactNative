import { FoodNavigator } from "./Food/FoodNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MoneyNavigator } from "./Money/MoneyNavigator";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { WatchNavigator } from "./Watch/WatchNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const TabNavigator = () => {
	const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer independent={true}>
			<Tab.Navigator
				initialRouteName="Money"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color }) => {
						let iconName;

						if (route.name === "Money") {
							iconName = focused ? "wallet" : "wallet-outline";
							//ios-rocket, ios-logo-usd
						} else if (route.name === "Food") {
							iconName = focused ? "ios-restaurant" : "ios-restaurant-outline";
							//nutrition, ios-restaurant, ios-basket
						} else if (route.name === "Watch") {
							iconName = focused ? "ios-watch" : "ios-watch-outline";
							// ios-watch, bluetooth, ios-wifi
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={25} color={color} />;
					},
					// tabBarActiveTintColor: "tomato",
					// tabBarInactiveTintColor: "gray",
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: [{ display: "flex" }, null],
					tabBarHideOnKeyboard: true,
				})}
			>
				<Tab.Screen name="Money" component={MoneyNavigator} />
				<Tab.Screen name="Food" component={FoodNavigator} />
				<Tab.Screen name="Watch" component={WatchNavigator} />
			</Tab.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
};
