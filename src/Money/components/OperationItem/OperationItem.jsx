import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { OPERATIONS_TYPES } from "../../../../constants/operationConstants";
import { STYLES } from "../../../../constants/styles";

export const OperationItem = ({ operationInfo, handleClickOperation }) => {
	const date = new Date(operationInfo.creationDate);

	const completeDate =
		(date.getHours() < 10 ? "0" : "") +
		date.getHours() +
		":" +
		(date.getMinutes() < 10 ? "0" : "") +
		date.getMinutes() +
		"  " +
		(date.getDate() < 10 ? "0" : "") +
		date.getDate() +
		"/" +
		(date.getMonth() + 1 < 10 ? "0" : "") +
		(date.getMonth() + 1) +
		"/" +
		date.getFullYear();

	const isLoading = operationInfo.type === -1;
	// const isInicioRegistro = operationInfo.type === 0;
	const isCreacionCuenta = operationInfo.type === 1;
	const isMovimiento = operationInfo.type === 2;
	const isCierreCuenta = operationInfo.type === 3;
	// const isIngreso = operationInfo.type === 4;
	// const isPago = operationInfo.type === 5;

	const isTransactionWithSameAmmount =
		isMovimiento &&
		!operationInfo.from.currency.localeCompare(operationInfo.sendTo.currency) &&
		operationInfo.from.ammount === operationInfo.sendTo.ammount;

	const stringAmmount = (ammount) =>
		ammount >= 1000000000 ? Math.trunc(ammount / 1000000000) + "B" : ammount;

	return (
		<TouchableOpacity
			style={{
				...STYLES.roundedItem,
				...STYLES.row,
				paddingVertical: 5,
			}}
			onPress={() => handleClickOperation(operationInfo.creationDate)}
			disabled={isLoading}
		>
			<View
				style={{
					alignSelf: "stretch",
					justifyContent: "flex-start",
					maxWidth: !isLoading ? "60%" : "100%",
				}}
			>
				<Text
					style={{
						...STYLES.bigText,
						marginBottom: 0,
					}}
				>
					{operationInfo.title?.length
						? operationInfo.title
						: OPERATIONS_TYPES[operationInfo.type]}
				</Text>
				{!isLoading && (
					<Text style={{ ...STYLES.normalText, fontSize: 13 }}>
						{completeDate}
					</Text>
				)}
			</View>

			{/* Moneda */}
			<View
				style={{
					alignItems: "flex-end",
					alignSelf: "flex-start",
					flex: 1,
					marginLeft: 15,
				}}
			>
				{!!(isCreacionCuenta || isCierreCuenta) && (
					<View style={{ alignItems: "flex-end" }}>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								marginBottom: -5,
							}}
						>
							{isCreacionCuenta
								? stringAmmount(operationInfo.initialAmmount)
								: 0 - operationInfo.finalAmmount}{" "}
							{operationInfo.currencyName}
						</Text>
						<Text style={STYLES.normalText}>{operationInfo.accountName}</Text>
					</View>
				)}
				{!!operationInfo.sendTo?.name?.length && (
					<View
						style={{
							alignItems: "flex-end",
						}}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								marginBottom: -5,
							}}
						>
							{stringAmmount(operationInfo.sendTo.ammount)}{" "}
							{operationInfo.sendTo.currency}
						</Text>
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								justifyContent: "flex-end",
							}}
						>
							{!!isTransactionWithSameAmmount && (
								<>
									<Text style={STYLES.normalText}>
										{operationInfo.from.name}
									</Text>
									<Text style={STYLES.normalText}>{" -> "}</Text>
								</>
							)}
							<Text
								style={{
									...STYLES.normalText,
									marginBottom: 5,
								}}
							>
								{operationInfo.sendTo.name}
							</Text>
						</View>
					</View>
				)}
				{!!(
					operationInfo.from?.name?.length && !isTransactionWithSameAmmount
				) && (
					<View style={{ alignItems: "flex-end" }}>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								marginBottom: -5,
							}}
						>
							{"-"}
							{stringAmmount(operationInfo.from.ammount)}{" "}
							{operationInfo.from.currency}
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
