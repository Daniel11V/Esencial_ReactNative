import React from "react";
import { View } from "react-native";
import BluetoothList from "../containers/bluetooth-list";

export const WatchHome = () => {
	return (
		<View forceInset="top">
			<BluetoothList />
		</View>
	);
};
