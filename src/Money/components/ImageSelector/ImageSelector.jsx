import React, { useEffect, useState } from "react";
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../../../constants/colors";
import { STYLES } from "../../../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

export const ImageSelector = ({
	updateImage,
	details = false,
	storedPhoto = "",
}) => {
	const [pickedUri, setPickedUri] = useState(storedPhoto);
	const [fullscreen, setFullscreen] = useState(false);
	const [photoWidth, setPhotoWidth] = useState(0);
	const [photoHeight, setPhotoHeight] = useState(0);
	const [photoWidthFull, setPhotoWidthFull] = useState(0);
	const [photoHeightFull, setPhotoHeightFull] = useState(0);

	useEffect(() => {
		setPickedUri(storedPhoto);
	}, [storedPhoto]);

	useEffect(() => {
		if (pickedUri.length && details && photoHeight !== 0) {
			Image.getSize(pickedUri, (width, height) => {
				setPhotoWidth((width / height) * photoHeight);
			});
		}
	}, [pickedUri, photoHeight]);

	useEffect(() => {
		if (pickedUri.length && fullscreen && photoWidthFull !== 0) {
			Image.getSize(pickedUri, (width, height) => {
				setPhotoHeightFull((height / width) * photoWidthFull);
			});
		}
	}, [pickedUri, photoWidthFull, fullscreen]);

	const verifyPermissions = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();

		if (status !== "granted") {
			Alert.alert(
				"Permisos insuficientes",
				"Necesitamos dar permisos de la cámara para usar la aplicación",
				[{ text: "Ok" }]
			);
			return false;
		}

		return true;
	};

	const handlerTakeImage = async () => {
		const isCameraOk = await verifyPermissions();
		if (!isCameraOk) return;

		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 0.8,
		});

		if (image.uri?.length) {
			updateImage(image.uri);
			if (!details) {
				setPickedUri(image.uri);
			}
		}
	};

	const handleDelete = () => {
		Alert.alert(
			"Estas seguro que deseas eliminar la foto?",
			"Esta accion no se podra deshacer, pero podras sacar una nueva.",
			[
				{ text: "Cancelar", style: "cancel" },
				{ text: "Confirmar", onPress: () => updateImage("") },
			]
		);
	};

	return details ? (
		<View style={{ flex: 1 }}>
			<View style={STYLES.row}>
				<Text style={STYLES.subtitle}>Ticket / Factura</Text>
				{pickedUri.length ? (
					<TouchableOpacity
						onPress={handleDelete}
						style={{ marginBottom: -15, padding: 8 }}
					>
						<Ionicons name="trash-outline" size={25} color="black" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={handlerTakeImage}
						style={{ marginBottom: -15 }}
					>
						<Ionicons name="camera" size={25} color="black" />
					</TouchableOpacity>
				)}
			</View>
			{!!pickedUri?.length && (
				<TouchableOpacity
					onLayout={(event) => setPhotoHeight(event.nativeEvent.layout.height)}
					onPress={() => setFullscreen(true)}
					style={{
						flex: 1,
						marginTop: 10,
						marginBottom: 25,
						position: "relative",
						width: parseInt(photoWidth),
						maxWidth: "100%",
						backgroundColor: COLORS.tinyGray,
						borderRadius: 15,
					}}
				>
					<Image
						style={{
							width: "100%",
							height: "100%",
							borderRadius: 15,
						}}
						resizeMode="contain"
						source={{ uri: pickedUri }}
					/>
					<Ionicons
						name="eye"
						size={25}
						color="rgba(0,0,0,0.7)"
						style={{ position: "absolute", right: 10, top: 5 }}
					/>
				</TouchableOpacity>
			)}
			{!!fullscreen && (
				<Modal visible={true}>
					<TouchableOpacity
						onPress={() => setFullscreen(false)}
						style={STYLES.modal}
					>
						<View
							style={{
								width: "85%",
								maxHeight: parseInt(photoHeightFull),
								position: "relative",
							}}
							onLayout={(event) =>
								setPhotoWidthFull(event.nativeEvent.layout.width)
							}
						>
							<Image source={{ uri: pickedUri }} style={styles.imgBigBox} />
							<Ionicons
								name="eye-off-outline"
								size={35}
								color="rgba(0,0,0,0.7)"
								style={{ position: "absolute", right: 12, top: 8 }}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
			)}
		</View>
	) : (
		<View
			style={{
				...STYLES.textInput,
				paddingBottom: 10,
				marginTop: 20,
			}}
		>
			{!pickedUri.length ? (
				<TouchableOpacity onPress={handlerTakeImage} style={STYLES.row}>
					<Ionicons name="camera" size={25} color="black" />
					<Text style={{ ...STYLES.bigText, marginLeft: 15, paddingBottom: 2 }}>
						Foto de ticket / factura
					</Text>
					<View style={{ ...styles.imgBox, flex: 1 }}></View>
				</TouchableOpacity>
			) : (
				<View style={STYLES.row}>
					<TouchableOpacity onPress={() => setPickedUri("")}>
						<Ionicons name="trash-outline" size={25} color="black" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setFullscreen(true)}
						style={{ ...STYLES.row, position: "relative", flex: 1 }}
					>
						<Text
							style={{ ...STYLES.bigText, marginLeft: 15, paddingBottom: 2 }}
						>
							Foto de ticket / factura
						</Text>
						<Image source={{ uri: pickedUri }} style={styles.imgBox} />
						<Ionicons
							name="eye"
							size={25}
							color="rgba(255,255,255,0.8)"
							style={styles.resize}
						/>
					</TouchableOpacity>
				</View>
			)}
			{!!fullscreen && (
				<Modal visible={true}>
					<TouchableOpacity
						onPress={() => setFullscreen(false)}
						style={STYLES.modal}
					>
						<View
							style={{
								width: "85%",
								maxHeight: parseInt(photoHeightFull),
								position: "relative",
							}}
							onLayout={(event) =>
								setPhotoWidthFull(event.nativeEvent.layout.width)
							}
						>
							<Image source={{ uri: pickedUri }} style={styles.imgBigBox} />
							<Ionicons
								name="eye-off-outline"
								size={35}
								color="rgba(0,0,0,0.7)"
								style={{ position: "absolute", right: 12, top: 8 }}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	preview: {
		width: "100%",
		height: 200,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		borderColor: COLORS.primary,
		borderWidth: 1,
	},
	imgBox: {
		width: 45,
		height: 45,
		borderRadius: 10,
	},
	resize: {
		position: "absolute",
		bottom: 9,
		right: 9.5,
	},
	imgBigBox: {
		minWidth: "100%",
		height: "100%",
		borderRadius: 20,
	},
});
