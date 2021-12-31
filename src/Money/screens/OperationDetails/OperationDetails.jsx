import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { STYLES } from "../../../../constants/styles";
import { OPERATIONS_TYPES } from "../../../../constants/operationConstants";
import { ImageSelector } from "../../components/ImageSelector/ImageSelector";
import { updateOperation } from "../../../../store/actions/money.action";

export const OperationDetails = ({ route }) => {
	const { operationId } = route.params;

	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);
	const operation = useSelector(
		(state) => state.money.currentRegister.operations[operationId]
	);

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

			{!!operation.title?.length && (
				<Text style={{ ...STYLES.bigText, marginTop: 15 }}>
					Categoria {OPERATIONS_TYPES[operation.type]}
				</Text>
			)}
			{(operation.type === 2 || operation.type === 4) && (
				<View>
					<Text style={STYLES.subtitle}>Cuenta destino</Text>
					<Text style={STYLES.bigText}>
						{operation.sendTo.name}
						{":  + "}
						{operation.sendTo.ammount} {operation.sendTo.currency}
					</Text>
				</View>
			)}
			{(operation.type === 2 || operation.type === 5) && (
				<View style={{ flex: 1 }}>
					<Text style={STYLES.subtitle}>Cuenta origen</Text>
					<Text style={STYLES.bigText}>
						{operation.from.name}
						{":  - "}
						{operation.from.ammount} {operation.from.currency}
					</Text>
					{operation.type === 5 && (
						<ImageSelector
							updateImage={(newValue) =>
								dispatch(
									updateOperation(
										registerId,
										operation.creationDate,
										"photo",
										newValue
									)
								)
							}
							details={true}
							storedPhoto={operation.photo ? operation.photo : ""}
						/>
					)}
				</View>
			)}
			{(operation.type === 1 || operation.type === 3) && (
				<View>
					<Text style={STYLES.subtitle}>{operation.accountName}</Text>
					<Text style={STYLES.bigText}>
						{operation.type === 1
							? "Monto inicial:  " +
							  operation.initialAmmount +
							  " " +
							  operation.currencyName
							: "Monto final:  " +
							  operation.finalAmmount +
							  " " +
							  operation.currencyName}
					</Text>
				</View>
			)}
		</View>
	);
};