import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { BankItem } from "../BankItem/BankItem";
import { STYLES } from "../../../../constants/styles";
import orderByDate from "../../../../functions/orderByDate";

export const BankList = ({ handleClickBank, simplified = false }) => {
	// When simplified == true => Bancos con al menos una
	// cuenta de uso diario, luego dejar solo estas cuenta

	// Aqui se recive a banks y bank.accounts como arrays en vez de objects
	const banksFiltered = useSelector((state) =>
		simplified
			? Object.values(state.money.banks)
					.filter(
						(bank) =>
							Object.values(bank?.accounts)?.some(
								(account) => account.category === "uso diario"
							) || bank.name === "Cargando..."
					)
					.map((bank) => ({
						...bank,
						accounts: Object.values(bank?.accounts)?.filter(
							(account) => account.category === "uso diario"
						),
					}))
			: Object.values(state.money.banks).map((bank) => ({
					...bank,
					accounts: Object.values(bank?.accounts),
			  }))
	);

	const loadingFirstView = useSelector((state) => state.money.loadingFirstView);

	const banksFinalList = loadingFirstView
		? [{ name: "Cargando...", accounts: [] }]
		: banksFiltered.length
		? orderByDate(banksFiltered)
		: [{ name: "Ninguna cuenta registrada...", accounts: [] }];

	return simplified ? (
		banksFinalList.map((bankInfo, key) => (
			<BankItem
				key={key}
				bankInfo={bankInfo}
				handleClickBank={handleClickBank}
				simplified={simplified}
			/>
		))
	) : (
		<FlatList
			data={banksFinalList}
			style={STYLES.flatListSetup}
			renderItem={(data) => (
				<BankItem
					bankInfo={data.item}
					handleClickBank={handleClickBank}
					simplified={simplified}
				/>
			)}
			keyExtractor={(item) => item.name}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			nestedScrollEnabled
		/>
	);
};
