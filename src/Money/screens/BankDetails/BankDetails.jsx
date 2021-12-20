import { Alert, Image, Pressable, Text, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../../../constants/colors";
import { STYLES } from "../../../../constants/styles";
import {
	BANKS_INFO,
	ACCOUNTS_CATEGORIES,
} from "../../../../constants/bankConstants";
import orderByDate from "../../../../functions/orderByDate";
import accountLogoDefault from "../../../../assets/account-logo.png";

import {
	deleteAccount,
	deleteBank,
	updateAccount,
} from "../../../../store/actions/money.action";

export const BankDetails = ({ route, navigation }) => {
	const { bankName, hasNewCurrency } = route.params;

	const dispatch = useDispatch();
	const bank = useSelector((state) => state.money.banks[bankName]);

	const [selectedAccount, setSelectedAccount] = useState(() =>
		hasNewCurrency ? hasNewCurrency : Object.keys(bank.accounts)[0]
	);

	const bankIndex = BANKS_INFO.findIndex((item) => item.name === bank.name);
	const pickerCategory = useRef();

	useEffect(() => {
		hasNewCurrency && setSelectedAccount(hasNewCurrency);
	}, [hasNewCurrency]);

	const onDelete = () => {
		if (Object.keys(bank.accounts).length === 1) {
			navigation.goBack();
			dispatch(deleteBank(bank.name));
		} else {
			dispatch(
				deleteAccount(bank.name, bank.accounts[selectedAccount]?.currency)
			);
			const accountsNames = Object.keys(bank.accounts);
			setSelectedAccount(
				selectedAccount === accountsNames[0]
					? accountsNames[1]
					: accountsNames[0]
			);
		}
	};

	const handleDelete = () => {
		Alert.alert(
			`Estas seguro que deseas eliminar la cuenta "${bank.name} ${bank.accounts[selectedAccount]?.currency}"`,
			"Esta accion no se podra deshacer",
			[
				{ text: "Cancelar", style: "cancel" },
				{ text: "Confirmar", onPress: onDelete },
			]
		);
	};

	return (
		<View style={STYLES.screenContainer}>
			<View style={{ ...STYLES.row, justifyContent: "flex-start" }}>
				<Image
					style={STYLES.titleBankImg}
					source={
						bankIndex === -1
							? accountLogoDefault
							: {
									uri: BANKS_INFO[bankIndex].imgUrl,
							  }
					}
				/>
				<Text style={STYLES.bigTitle}>{bank.name}</Text>
			</View>
			<Pressable
				style={{
					alignSelf: "flex-end",
					marginVertical: 10,
				}}
				onPress={() =>
					navigation.push("BankForm", {
						insideBank: bankName,
						isNewCurrency: true,
					})
				}
			>
				<Text style={STYLES.btnThirdText}>Añadir moneda</Text>
			</Pressable>
			<View style={STYLES.boxesContainer}>
				{orderByDate(Object.values(bank.accounts)).map((account, key) => (
					<Pressable
						key={key}
						onPress={() => setSelectedAccount(account.currency)}
						style={{
							...(bank.accounts[selectedAccount]?.currency == account.currency
								? STYLES.btnSecondaryMiddle
								: STYLES.roundedItemMiddle),
							paddingHorizontal: 12,
							paddingVertical: 12,
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								...(bank.accounts[selectedAccount]?.currency ==
									account.currency && { color: COLORS.primary }),
							}}
						>
							{account.ammount} {account.currency}
						</Text>
						{bank.accounts[selectedAccount]?.currency == account.currency && (
							<Pressable onPress={handleDelete}>
								<Ionicons
									name="close-circle"
									size={25}
									color={COLORS.lightGray}
								/>
							</Pressable>
						)}
					</Pressable>
				))}
			</View>
			<Text style={STYLES.subtitle}>Detalles</Text>
			<View style={STYLES.row}>
				<Text style={STYLES.normalText}>
					Cuenta de {bank.accounts[selectedAccount]?.category}
				</Text>
				<View>
					<Pressable onPress={() => pickerCategory.current.focus()}>
						<Text style={STYLES.btnThirdText}>Cambiar</Text>
					</Pressable>
					<Picker
						selectedValue={bank.accounts[selectedAccount]?.category}
						onValueChange={(newValue) =>
							dispatch(
								updateAccount(
									bank.name,
									bank.accounts[selectedAccount]?.currency,
									"category",
									newValue
								)
							)
						}
						ref={pickerCategory}
						style={STYLES.invisible}
						prompt="Tipo de cuenta"
					>
						{ACCOUNTS_CATEGORIES.map((categoryName, key) => (
							<Picker.Item
								key={key}
								label={`   Cuenta de ${categoryName}`}
								value={categoryName}
								style={{
									...STYLES.bigText,
									backgroundColor:
										categoryName === bank.accounts[selectedAccount]?.category
											? COLORS.tinyGray
											: "#fff",
								}}
							/>
						))}
					</Picker>
				</View>
			</View>
			{/* Operaciones */}
			<Text style={STYLES.subtitle}>Operaciones</Text>
		</View>
	);
};
