import { View } from "react-native";
import {
	AdMobBanner
  } from 'expo-ads-admob';
import { OperationList } from "../../components/OperationList/OperationList";
import React from "react";
import { STYLES } from "../../../../constants/styles";

export const Operations = ({ navigation }) => {
	return (
		<View style={{flex:1}}>
			<AdMobBanner
					style={{height:60}}
					bannerSize="fullBanner"
					testDeviceId="EMULATOR"
					adUnitID="ca-app-pub-3940256099942544/6300978111"   // 1027615916432065/3076638211
					onDidFailToReceiveAdWithError={(e) => alert(e)} />
			<View style={{ ...STYLES.screenContainer, paddingTop: 0 }}>
				<OperationList
					handleClickOperation={(operationId) =>
						navigation.push("OperationDetails", { operationId })
					}
					verticalSpace = {true}
				/>
			</View>
		</View>
	);
};
