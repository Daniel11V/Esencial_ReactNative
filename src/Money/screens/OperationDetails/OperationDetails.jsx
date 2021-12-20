import { Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { STYLES } from "../../../../constants/styles";
import { OPERATIONS_TYPES } from "../../../../constants/operationConstants";

export const OperationDetails = ({ route }) => {
	const { operationId } = route.params;

	const operation = useSelector((state) => state.money.operations[operationId]);

	return (
		<View style={STYLES.screenContainer}>
			<View style={{ ...STYLES.row, justifyContent: "flex-start" }}>
				<Text style={STYLES.bigTitle}>
					{operation?.title?.length
						? operation.title
						: OPERATIONS_TYPES[operation.type]}
				</Text>
			</View>
			<View style={{ ...STYLES.row, justifyContent: "flex-start" }}>
				<Text style={STYLES.normalText}>
					{new Date(operation.creationDate).toLocaleTimeString("en-US") +
						"  " +
						new Date(operation.creationDate).getDate() +
						"/" +
						(new Date(operation.creationDate).getMonth() + 1) +
						"/" +
						new Date(operation.creationDate).getFullYear()}
				</Text>
			</View>

			{operation?.title?.length && (
				<Text style={{ ...STYLES.bigText, marginTop: 15 }}>
					{OPERATIONS_TYPES[operation.type]}
				</Text>
			)}
			<Text style={STYLES.subtitle}>Cuenta destino</Text>
			<View style={{ ...STYLES.row, justifyContent: "flex-start" }}>
				<Text style={STYLES.bigText}>{operation?.sendTo?.name}: </Text>
				<Text style={STYLES.bigText}> + {operation?.sendTo?.ammount} </Text>
				<Text style={STYLES.bigText}>{operation?.sendTo?.currency}</Text>
			</View>
			<Text style={STYLES.subtitle}>Cuenta origen</Text>
			<View style={{ ...STYLES.row, justifyContent: "flex-start" }}>
				<Text style={STYLES.bigText}>{operation?.from?.name}: </Text>
				<Text style={STYLES.bigText}> - {operation?.from?.ammount} </Text>
				<Text style={STYLES.bigText}>{operation?.from?.currency}</Text>
			</View>
		</View>
	);
};
