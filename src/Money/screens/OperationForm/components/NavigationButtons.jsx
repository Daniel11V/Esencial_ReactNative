import React from "react";
import { Pressable, Text, View } from "react-native";
import { STYLES } from "../../../../../constants/styles";

export const NavigationButtons = ({
	navigation,
	nextStep,
	firstStep = false,
}) => {
	return (
		<View style={STYLES.row}>
			{!firstStep && (
				<Pressable
					onPress={() => navigation.goBack()}
					style={{
						...STYLES.btnPrimary,
						paddingVertical: 5,
						marginTop: 25,
					}}
				>
					<Text style={STYLES.btnPrimaryText}>Atras</Text>
				</Pressable>
			)}
			<Pressable
				onPress={() => nextStep()}
				style={{
					...STYLES.btnPrimary,
					paddingVertical: 5,
					marginTop: 25,
					alignSelf: "flex-end",
					flex: firstStep ? 1 : null,
				}}
			>
				<Text style={STYLES.btnPrimaryText}>Siguiente</Text>
			</Pressable>
		</View>
	);
};
