import React, { useState } from "react";
import { View, Platform } from "react-native";
import { BannerAd } from "expo-ads-facebook";
import { COLORS } from "../../../../constants/colors";

//FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);

export const FacebookBanner = (isLoaded = true) => {
	const devAddition = __DEV__ ? "IMG_16_9_APP_INSTALL#" : "";
	const [bannerId, setBannerId] = useState(
		Platform.OS === "ios"
			? devAddition + "353519270015819_353540143347065"
			: devAddition + "353519270015819_353540430013703"
	);

	return (
		<View style={{ backgroundColor: COLORS.backgroundAds }}>
			{isLoaded && (
				<BannerAd
					placementId={bannerId}
					type="standard"
					onPress={() => console.log("click")}
					onError={(error) => console.log("Baner Error", error)}
				/>
			)}
		</View>
	);
};
