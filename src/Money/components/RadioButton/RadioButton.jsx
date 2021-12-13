import { COLORS } from "../../../../constants/colors";
import React from "react";
import { View } from "react-native";

export const RadioButton = (props) => {
	return (
		<View
			style={[
				{
					height: 24,
					width: 24,
					borderRadius: 12,
					borderWidth: 2,
					borderColor: COLORS.primary,
					alignItems: "center",
					justifyContent: "center",
				},
				props.style,
			]}
		>
			{props.selected ? (
				<View
					style={{
						height: 12,
						width: 12,
						borderRadius: 6,
						backgroundColor: COLORS.primary,
					}}
				/>
			) : null}
		</View>
	);
};
