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
		setType(newType);
		Animated.timing(opacityAnimation[newType], {
			toValue: 0.5,
			duration: 100,
			useNativeDriver: true,
		}).start(() => {
			nextStep(newType);
			Animated.timing(opacityAnimation[newType], {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		});
	};

	const nextStep = (newType = type) => {
		if (!newType.localeCompare("Ingreso")) {
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
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Pressable
						onPress={() => changeType("Movimiento")}
						style={({ pressed }) => [
							{
								...(type == "Movimiento"
									? STYLES.btnSecondary
									: STYLES.roundedItem),
								paddingHorizontal: 10,
								paddingVertical: 10,
								opacity: pressed ? 0.3 : 1,
							},
						]}
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
							style={({ pressed }) => [
								{
									...(type == "Ingreso"
										? STYLES.btnSecondaryMiddle
										: STYLES.roundedItemMiddle),
									paddingHorizontal: 10,
									paddingVertical: 10,
									opacity: pressed ? 0.3 : 1,
								},
							]}
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
							style={({ pressed }) => [
								{
									...(type == "Pago"
										? STYLES.btnSecondaryMiddle
										: STYLES.roundedItemMiddle),
									paddingHorizontal: 10,
									paddingVertical: 10,
									opacity: pressed ? 0.3 : 1,
								},
							]}
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
