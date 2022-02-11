import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { STYLES } from "../../../../../constants/styles";

export const NavigationButtons = ({
	navigation,
	nextStep,
	firstStep = false,
	lastStep = false,
}) => {
	return (
		<View style={STYLES.row}>
			{!firstStep && (
				<Pressable
					onPress={() => navigation.goBack()}
					style={({ pressed }) => [
						{
							...STYLES.btnPrimary,
							paddingVertical: 5,
							marginTop: 25,
							opacity: pressed ? 0.8 : 1,
						},
					]}
				>
					<Text style={STYLES.btnPrimaryText}>Atras</Text>
				</Pressable>
			)}
			<Pressable
				onPress={() => nextStep()}
				style={({ pressed }) => [
					{
						...(lastStep ? STYLES.btnSecondary : STYLES.btnPrimary),
						paddingVertical: 5,
						marginTop: 25,
						alignSelf: "flex-end",
						flex: firstStep ? 1 : null,
						opacity: pressed ? 0.8 : 1,
					},
				]}
			>
				<Text
					style={lastStep ? STYLES.btnSecondaryText : STYLES.btnPrimaryText}
				>
					{lastStep ? "Confirmar" : "Siguiente"}
				</Text>
			</Pressable>
		</View>
	);
};
