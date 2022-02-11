import React, { useContext, useRef } from "react";
import {
	Animated,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { STYLES } from "../../../../../constants/styles";
import { NavigationButtons } from "../components/NavigationButtons";
import { OperationFormContext } from "../context/OperationFormContextProvider";

export const OperationTypes = ({ navigation }) => {
	const { type, setType } = useContext(OperationFormContext);

	const opacityAnimation = {
		Movimiento: useRef(new Animated.Value(1)).current,
		Ingreso: useRef(new Animated.Value(1)).current,
		Pago: useRef(new Animated.Value(1)).current,
	};

	const changeType = (newType) => {
		Animated.timing(opacityAnimation[newType], {
			toValue: 0.5,
			duration: 100,
			useNativeDriver: true,
		}).start(() => {
			setType(newType);

			Animated.timing(opacityAnimation[newType], {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		});

		nextStep();
	};

	const nextStep = () => {
		if (!type.localeCompare("Ingreso")) {
			navigation.push("OperationSendToAccount");
		} else {
			navigation.push("OperationFromAccount");
		}
	};

	return (
		<SafeAreaView
			style={{ ...STYLES.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<ScrollView
				style={{ height: "100%" }}
				keyboardShouldPersistTaps="handled"
			>
				<Pressable
					onPress={() => changeType("Movimiento")}
					style={{
						...(type == "Movimiento"
							? STYLES.btnSecondary
							: STYLES.roundedItem),
						paddingHorizontal: 10,
						paddingVertical: 10,
					}}
				>
					<Text
						style={{
							...STYLES.bigText,
							fontWeight: "bold",
							...(type == "Movimiento" && { color: COLORS.primary }),
						}}
					>
						Movimiento entre mis cuentas
					</Text>
				</Pressable>
				<View style={STYLES.boxesContainer}>
					<Pressable
						onPress={() => changeType("Ingreso")}
						style={{
							...(type == "Ingreso"
								? STYLES.btnSecondaryMiddle
								: STYLES.roundedItemMiddle),
							paddingHorizontal: 10,
							paddingVertical: 10,
						}}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								...(type == "Ingreso" && { color: COLORS.primary }),
							}}
						>
							Ingreso
						</Text>
					</Pressable>
					<Pressable
						onPress={() => changeType("Pago")}
						style={{
							...(type == "Pago"
								? STYLES.btnSecondaryMiddle
								: STYLES.roundedItemMiddle),
							paddingHorizontal: 10,
							paddingVertical: 10,
						}}
					>
						<Text
							style={{
								...STYLES.bigText,
								fontWeight: "bold",
								...(type == "Pago" && { color: COLORS.primary }),
							}}
						>
							Pago
						</Text>
					</Pressable>
				</View>
				<NavigationButtons
					navigation={navigation}
					nextStep={nextStep}
					firstStep={true}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};
