import React, { useContext } from "react";
import {
	Keyboard,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
} from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { STYLES } from "../../../../../constants/styles";
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector";
import { NavigationButtons } from "../components/NavigationButtons";
import { OperationFormContext } from "../context/OperationFormContextProvider";

export const OperationFormDetails = ({ navigation, route }) => {
	const { moneyNavigation } = route.params;

	const { title, setTitle, photo, setPhoto, uploadOperation } =
		useContext(OperationFormContext);

	const nextStep = () => {
		Keyboard.dismiss();
		uploadOperation();
		moneyNavigation.goBack();
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
					<TextInput
						placeholder="Titulo / Motivo de la operación"
						style={{ ...STYLES.textInput, marginTop: 20 }}
						maxLength={65}
						selectionColor={COLORS.primary}
						value={title}
						onChangeText={(text) => setTitle(text)}
					/>
					<ImageSelector
						updateImage={(image) => setPhoto(image)}
						storedPhoto={photo}
					/>
				</View>
				<NavigationButtons
					navigation={navigation}
					nextStep={nextStep}
					lastStep
				/>
			</ScrollView>
		</SafeAreaView>
	);
};
