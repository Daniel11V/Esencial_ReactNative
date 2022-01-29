import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { STYLES } from "../../../../constants/styles";
import { BANKS_INFO } from "../../../../constants/bankConstants";
import React from "react";
import orderByDate from "../../../../functions/orderByDate";
import accountLogoDefault from "../../../../assets/account-logo.png";

export const BankItem = ({ bankInfo, handleClickBank, simplified }) => {
	const bankIndex = BANKS_INFO.findIndex((bank) => bank.name === bankInfo.name);

	const labelCategoryColor = (category) => {
		if (category === "uso diario") {
			return "#e6c300";
		} else if (category === "ahorro / inversion") {
			return "#1f993e";
		} else if (category === "emergencia") {
			return "#c27300";
		}
	};

	return (
		<TouchableOpacity
			style={{
				...STYLES.roundedItem,
				flexDirection: simplified ? "row" : "column",
			}}
			onPress={() => handleClickBank(bankInfo.name)}
			disabled={bankInfo.accounts.length === 0}
		>
			<View
				style={{
					alignSelf: "flex-start",
					...STYLES.row,
				}}
			>
				<Image
					style={STYLES.tinyBankImg}
					source={
						bankIndex === -1
							? accountLogoDefault
							: {
									uri: BANKS_INFO[bankIndex].imgUrl,
							  }
					}
				/>
				<Text style={STYLES.bigText}>{bankInfo.name}</Text>
			</View>
			<View
				style={{
					alignSelf: "stretch",
					justifyContent: "center",
					marginTop: simplified ? 0 : 5,
				}}
			>
				{orderByDate(bankInfo.accounts).map((account, key) => (
					<View
						style={{
							...STYLES.row,
							alignSelf: simplified ? "flex-end" : "auto",
							padding: simplified ? 2 : 5,
						}}
						key={key}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
							}}
						>
							{(account.ammount)>=1000000000?(Math.trunc(account.ammount/1000000000) + "B"):account.ammount} {account.currency}
						</Text>
						{!simplified && account.category ? (
							<View
								style={{
									...styles.accountItemCategory,
									backgroundColor: labelCategoryColor(account.category),
								}}
							>
								<Text style={styles.accountItemCategoryText}>
									{account.category}
								</Text>
							</View>
						) : null}
					</View>
				))}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	accountItemCategory: {
		paddingBottom: 2,
		paddingHorizontal: 8,
		borderRadius: 5,
	},
	accountItemCategoryText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 13,
	},
});
