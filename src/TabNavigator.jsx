import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { MoneyNavigator } from "./Money/MoneyNavigator";
import { FoodNavigator } from "./Food/FoodNavigator";
import { WatchNavigator } from "./Watch/WatchNavigator";
import { FilesNavigator } from "./Files/FilesNavigator";
import { HealthNavigator } from "./Health/HealthNavigator";
import { UserNavigator } from "./User/UserNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const TabNavigator = () => {
	const Tab = createBottomTabNavigator();

	return (
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
					} else if (route.name === "Health") {
						iconName = focused ? "md-body" : "md-body-outline";
						// md-body, fitness, heart, heart-circle, man, medical, medkit, pulse, shield-checkmark
					} else if (route.name === "Watch") {
						iconName = focused ? "ios-watch" : "ios-watch-outline";
						// ios-watch, bluetooth, ios-wifi
					} else if (route.name === "Files") {
						iconName = focused ? "file-tray-full" : "file-tray-full-outline";
						// file-tray-full, library, cloud, save
					} else if (route.name === "User") {
						iconName = focused ? "person-circle" : "person-circle-outline";
						// body, person-circle
					} else {
						iconName = focused ? "file-tray-full" : "file-tray-full-outline";
						// file-tray-full, library, cloud, save
					}

					return <Ionicons name={iconName} size={25} color={color} />;
				},
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: [{ display: "flex" }, null],
				tabBarHideOnKeyboard: true,
			})}
		>
			<Tab.Screen name="Money" component={MoneyNavigator} />
			{/* <Tab.Screen name="Food" component={FoodNavigator} />
			<Tab.Screen name="Health" component={HealthNavigator} />
		<Tab.Screen name="Files" component={FilesNavigator} /> */}
			<Tab.Screen name="Watch" component={WatchNavigator} />
			<Tab.Screen name="User" component={UserNavigator} />
		</Tab.Navigator>
	);
};
