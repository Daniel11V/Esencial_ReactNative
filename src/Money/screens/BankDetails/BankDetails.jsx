import {
	Alert,
	Animated,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
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
	addOperation,
	deleteAccount,
	deleteBank,
	updateAccount,
} from "../../../../store/actions/money.action";
import { OperationList } from "../../components/OperationList/OperationList";

export const BankDetails = ({ route, navigation }) => {
	const { bankName, hasNewCurrency } = route.params;

	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);
	const bank = useSelector(
		(state) => state.money.currentRegister.banks[bankName]
	);

	const [selectedAccount, setSelectedAccount] = useState(() =>
		hasNewCurrency ? hasNewCurrency : Object.keys(bank.accounts)[0]
	);

	const bankIndex = BANKS_INFO.findIndex((item) => item.name === bank.name);
	const pickerCategory = useRef();

	useEffect(() => {
		hasNewCurrency && changeSelectedAccount(hasNewCurrency);
	}, [hasNewCurrency]);

	const onDelete = () => {
		dispatch(
			addOperation(registerId, {
				type: 3,
				creationDate: Date.now(),
				accountName: bank.name,
				currencyName: bank.accounts[selectedAccount]?.currency,
				finalAmmount: bank.accounts[selectedAccount]?.ammount,
			})
		);
		if (Object.keys(bank.accounts).length === 1) {
			navigation.goBack();
			dispatch(deleteBank(registerId, bank.name));
		} else {
			dispatch(
				deleteAccount(
					registerId,
					bank.name,
					bank.accounts[selectedAccount]?.currency
				)
			);
			const accountsNames = Object.keys(bank.accounts);
			changeSelectedAccount(
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

	const opacDetails = useRef(new Animated.Value(1)).current;

	const changeSelectedAccount = (newValue) => {
		Animated.timing(opacDetails, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start(() => {
			setSelectedAccount(newValue);

			Animated.timing(opacDetails, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start();
		});
	};

	return (
		<ScrollView style={{ ...STYLES.screenContainer, flex: 1 }}>
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
						onPress={() => changeSelectedAccount(account.currency)}
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
			<Animated.View style={{ opacity: opacDetails }}>
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
										registerId,
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
				<Text style={{ ...STYLES.subtitle, marginBottom: 0 }}>Operaciones</Text>
				<OperationList
					handleClickOperation={(operationId) =>
						navigation.push("OperationDetails", { operationId })
					}
					filter={{ bank: bankName, account: selectedAccount }}
					verticalSpace={true}
				/>
			</Animated.View>
		</ScrollView>
	);
};
