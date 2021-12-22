import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { OperationItem } from "../OperationItem/OperationItem";
import { STYLES } from "../../../../constants/styles";
import orderByDate from "../../../../functions/orderByDate";

export const OperationList = ({
	handleClickOperation,
	showOnlyThree = false,
	filter = { bank: "", account: "" },
	verticalSpace = false,
}) => {
	// When showOnlyThree == true => Bancos con al menos una
	// cuenta de uso diario, luego dejar solo estas cuenta

	// Aqui se recive a operations y operation.accounts como arrays en vez de objects
	const operationsFiltered = useSelector((state) =>
		showOnlyThree
			? Object.values(state.money.operations).slice(-3)
			: filter.bank.length
			? Object.values(state.money.operations).filter((oper) => {
					if (oper.type === 1) {
						if (
							!oper.accountName.localeCompare(filter.bank) &&
							!oper.currencyName.localeCompare(filter.account)
						) {
							return true;
						}
					} else {
						if (oper.type === 2 || oper.type === 4) {
							if (
								!oper.sendTo.name.localeCompare(filter.bank) &&
								!oper.sendTo.currency.localeCompare(filter.account)
							) {
								return true;
							}
						}
						if (oper.type === 2 || oper.type === 5) {
							if (
								!oper.from.name.localeCompare(filter.bank) &&
								!oper.from.currency.localeCompare(filter.account)
							) {
								return true;
							}
						}
					}

					return false;
			  })
			: Object.values(state.money.operations)
	);

	let loadingFirstView = true;
	loadingFirstView = useSelector((state) => state.money.loadingFirstView);

	const operationsFinalList = loadingFirstView
		? [{ title: "Cargando...", type: -1 }]
		: operationsFiltered.length
		? orderByDate(operationsFiltered).reverse()
		: [{ title: "Ninguna operación registrada...", type: -1 }];

	return showOnlyThree || filter.bank.length ? (
		<View style={verticalSpace && { paddingBottom: 50, paddingTop: 15 }}>
			{operationsFinalList.map((operationInfo, key) => (
				<OperationItem
					key={key}
					operationInfo={operationInfo}
					handleClickOperation={handleClickOperation}
				/>
			))}
		</View>
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
			keyExtractor={(item) => item.creationDate}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			ListFooterComponent={
				<View style={verticalSpace && { paddingBottom: 50 }}></View>
			}
			ListHeaderComponent={
				<View style={verticalSpace && { paddingTop: 25 }}></View>
			}
			nestedScrollEnabled
		/>
	);
};
