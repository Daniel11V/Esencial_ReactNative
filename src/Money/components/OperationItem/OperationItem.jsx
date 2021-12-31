import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { OPERATIONS_TYPES } from "../../../../constants/operationConstants";
import { STYLES } from "../../../../constants/styles";

export const OperationItem = ({ operationInfo, handleClickOperation }) => {
	const date = new Date(operationInfo.creationDate);
	const printCategoryWord = !!(
		operationInfo.type !== 0 &&
		operationInfo.type !== 1 &&
		operationInfo.type !== 3 &&
		operationInfo.title?.length
	);

	const completeDate =
		(date.getHours() < 10 ? "0" : "") +
		date.getHours() +
		":" +
		(date.getMinutes() < 10 ? "0" : "") +
		date.getMinutes() +
		"  " +
		date.getDate() +
		"/" +
		(date.getMonth() + 1) +
		"/" +
		date.getFullYear();

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
					maxWidth: operationInfo.type !== -1 ? "60%" : "100%",
				}}
			>
				{!!operationInfo.title?.length && (
					<Text
						style={{
							...STYLES.bigText,
							marginBottom: 0,
						}}
					>
						{operationInfo.title}
					</Text>
				)}
				{operationInfo.type !== -1 && (
					<View>
						<Text
							style={{
								...(operationInfo.title?.length
									? STYLES.normalText
									: STYLES.bigText),
								marginBottom: 2,
							}}
						>
							{printCategoryWord && "Categoria "}
							{OPERATIONS_TYPES[operationInfo.type]}
						</Text>
						<Text style={{ ...STYLES.normalText, fontSize: 13 }}>
							{completeDate}
						</Text>
					</View>
				)}
			</View>
			<View style={{ alignItems: "flex-end", alignSelf: "flex-start" }}>
				{(operationInfo.type === 1 || operationInfo.type === 3) && (
					<View style={{ alignItems: "flex-end" }}>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								marginBottom: -5,
							}}
						>
							{operationInfo.type === 1
								? operationInfo.initialAmmount
								: 0 - operationInfo.finalAmmount}{" "}
							{operationInfo.currencyName}
						</Text>
						<Text style={{ ...STYLES.normalText }}>
							{operationInfo.accountName}
						</Text>
					</View>
				)}
				{(operationInfo.type === 2 || operationInfo.type === 4) && (
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
					</View>
				)}
				{(operationInfo.type === 2 || operationInfo.type === 5) && (
					<View style={{ alignItems: "flex-end" }}>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								marginBottom: -5,
							}}
						>
							-{operationInfo.from.ammount} {operationInfo.from.currency}
						</Text>
						<Text style={{ ...STYLES.normalText }}>
							{operationInfo.from.name}
						</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};
