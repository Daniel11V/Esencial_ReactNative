import React, { useContext, useRef } from "react";
import {
	Animated,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import { STYLES } from "../../../../../constants/styles";
import { COLORS } from "../../../../../constants/colors";
import { NavigationButtons } from "../components/NavigationButtons";
import { OperationFormContext } from "../context/OperationFormContextProvider";

export const OperationSendToAccount = ({ navigation }) => {
	const { type, setType } = useContext(OperationFormContext);

	const nextStep = () => {
		if (!type.localeCompare("Ingreso")) {
			navigation.push("OperationSendToAccount");
		} else {
			navigation.push("OperationFromAccount");
		}
	};

	return (
		<SafeAreaView
			style={{ ...STYLES.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<ScrollView
				style={{ height: "100%" }}
				keyboardShouldPersistTaps="handled"
			>
				<NavigationButtons navigation={navigation} nextStep={nextStep} />
			</ScrollView>
		</SafeAreaView>
	);
};
