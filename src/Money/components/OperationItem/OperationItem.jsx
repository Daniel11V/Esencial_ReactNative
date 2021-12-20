import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OPERATIONS_TYPES } from "../../../../constants/operationConstants";

import { STYLES } from "../../../../constants/styles";

export const OperationItem = ({ operationInfo, handleClickOperation }) => {
	return (
		<TouchableOpacity
			style={{ ...STYLES.roundedItem, ...STYLES.row }}
			onPress={() => handleClickOperation(operationInfo.creationDate)}
			disabled={operationInfo.type === -1}
		>
			<View
			// style={{
			// 	alignSelf: "flex-start",
			// 	justifyContent: "space-betwwen"
			// }}
			>
				<Text style={STYLES.bigText}>
					{OPERATIONS_TYPES[operationInfo.type]}
				</Text>
				<Text style={STYLES.normalText}>{operationInfo.creationDate}</Text>
			</View>
			{operationInfo.type === 1 && (
				<View>
					<Text style={{ ...STYLES.bigText, fontWeight: "bold" }}>
						{operationInfo.initialAmmount} {operationInfo.currencyName}
					</Text>
					<Text
						style={{
							...STYLES.normalText,
						}}
					>
						{operationInfo.accountName}
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
