import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { OPERATIONS_TYPES } from "../../../../constants/operationConstants";

import { STYLES } from "../../../../constants/styles";

export const OperationItem = ({ operationInfo, handleClickOperation }) => {
	return (
		<TouchableOpacity
			style={{ ...STYLES.roundedItem, ...STYLES.row, paddingVertical: 5 }}
			onPress={() => handleClickOperation(operationInfo.creationDate)}
			disabled={operationInfo.type === -1}
		>
			<View
				style={{
					alignSelf: "stretch",
					justifyContent: "flex-start",
					maxWidth: "60%",
				}}
			>
				{!!operationInfo.title?.length && (
					<Text style={STYLES.bigText}>{operationInfo.title}</Text>
				)}
				{operationInfo.type !== -1 && (
					<View>
						<Text
							style={
								operationInfo.title?.length ? STYLES.normalText : STYLES.bigText
							}
						>
							{OPERATIONS_TYPES[operationInfo.type]}
						</Text>
						<Text style={STYLES.normalText}>
							{new Date(operationInfo.creationDate).toLocaleTimeString(
								"en-US"
							) +
								"  " +
								new Date(operationInfo.creationDate).getDate() +
								"/" +
								(new Date(operationInfo.creationDate).getMonth() + 1) +
								"/" +
								new Date(operationInfo.creationDate).getFullYear()}
						</Text>
					</View>
				)}
			</View>
			{operationInfo.type === 1 && (
				<View style={{ alignItems: "flex-end" }}>
					<Text style={{ ...STYLES.bigText, fontWeight: "bold" }}>
						{operationInfo.initialAmmount} {operationInfo.currencyName}
					</Text>
					<Text style={{ ...STYLES.normalText }}>
						{operationInfo.accountName}
					</Text>
				</View>
			)}
			{operationInfo.type === 2 && (
				<View style={{ alignItems: "flex-end" }}>
					<Text
						style={{
							...STYLES.bigText,
							fontWeight: "bold",
							marginBottom: -5,
						}}
					>
						{operationInfo.sendTo.ammount} {operationInfo.sendTo.currency}
					</Text>
					<Text style={{ ...STYLES.normalText, marginBottom: 5 }}>
						{operationInfo.sendTo.name}
					</Text>
					<Text
						style={{ ...STYLES.bigText, fontWeight: "bold", marginBottom: -5 }}
					>
						-{operationInfo.from.ammount} {operationInfo.from.currency}
					</Text>
					<Text style={{ ...STYLES.normalText }}>
						{operationInfo.from.name}
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	accountItemCategory: {
		paddingBottom: 2,
		paddingHorizontal: 8,
		borderRadius: 5,
		// width: 140,
		// alignItems: "center",
	},
});
