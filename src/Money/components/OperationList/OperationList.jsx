import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { OperationItem } from "../OperationItem/OperationItem";
import { STYLES } from "../../../../constants/styles";
import orderByDate from "../../../../functions/orderByDate";

export const OperationList = ({
	handleClickOperation,
	showOnlyThree = false,
}) => {
	// When showOnlyThree == true => Bancos con al menos una
	// cuenta de uso diario, luego dejar solo estas cuenta

	// Aqui se recive a operations y operation.accounts como arrays en vez de objects
	const operationsFiltered = useSelector((state) =>
		showOnlyThree
			? Object.values(state.money.operations).slice(0, 3)
			: Object.values(state.money.operations)
	);

	const operationsFinalList = operationsFiltered.length
		? orderByDate(operationsFiltered)
		: [{ name: "Ninguna operación registrada...", type: -1 }];

	return showOnlyThree ? (
		operationsFinalList.map((operationInfo, key) => (
			<OperationItem
				key={key}
				operationInfo={operationInfo}
				handleClickOperation={handleClickOperation}
			/>
		))
	) : (
		<FlatList
			data={operationsFinalList}
			style={STYLES.flatListSetup}
			renderItem={(data) => (
				<OperationItem
					operationInfo={data.item}
					handleClickOperation={handleClickOperation}
				/>
			)}
			keyExtractor={(item) => item.name}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			nestedScrollEnabled
		/>
	);
};
