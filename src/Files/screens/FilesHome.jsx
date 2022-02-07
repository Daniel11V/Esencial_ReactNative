import React from "react";
import { View } from "react-native";
import {
	AdMobBanner
  } from 'expo-ads-admob';

export const FilesHome = () => {

	return (
		<View forceInset="top">
			<AdMobBanner
				style={{height:60}}
				bannerSize="fullBanner"
				testDeviceId="EMULATOR"
				adUnitID="ca-app-pub-3940256099942544/6300978111"   // 1027615916432065/3076638211
				onDidFailToReceiveAdWithError={(e) => console.log(e)} />
		</View> 	
	);
};
