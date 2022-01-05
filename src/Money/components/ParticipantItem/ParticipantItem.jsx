import { Text, TouchableOpacity, View, Image } from "react-native";
import { STYLES } from "../../../../constants/styles";
import React from "react";
import { COLORS } from "../../../../constants/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
// import userLogoDefault from "../../../assets/user-img-login.png";
import userLogoDefault from "../../../../assets/user-img-login.png";

export const ParticipantItem = ({
	participantInfo,
	handleClick,
	userIsOwner = false,
	isButton = false,
}) => {
	const accessLevelWords = ["Propietario", "Editor", "Lector"];

	if (isButton) {
		return (
			<TouchableOpacity
				style={{ ...STYLES.row, paddingVertical: 8, paddingHorizontal: 0 }}
				onPress={handleClick}
			>
				{!participantInfo.title.localeCompare("Añadir participantes") && (
					<View
						style={{
							...STYLES.tinyParticipantImg,
							backgroundColor: COLORS.primary,
							justifyContent: "center",
							alignItems: "center",
							paddingLeft: 3,
						}}
					>
						<Feather name="user-plus" color="white" size={22}></Feather>
					</View>
				)}
				{!participantInfo.title.localeCompare("Salir del registro") && (
					<View
						style={{
							...STYLES.tinyParticipantImg,
							backgroundColor: "red",
							justifyContent: "center",
							alignItems: "center",
							paddingLeft: 3,
						}}
					>
						<Feather name="user-minus" color="white" size={22}></Feather>
					</View>
				)}
				{!participantInfo.title.localeCompare("Eliminar registro") && (
					<View
						style={{
							...STYLES.tinyParticipantImg,
							backgroundColor: "red",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<MaterialIcons
							name="remove-circle-outline"
							color="white"
							size={24}
						></MaterialIcons>
					</View>
				)}
				<View
					style={{
						justifyContent: "flex-start",
						alignItems: "stretch",
						flex: 1,
					}}
				>
					<Text
						style={{
							...STYLES.userName,
							color: "rgba(0, 0, 0, 0.7)",
						}}
					>
						{participantInfo.title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	} else
		return (
			<TouchableOpacity
				style={{ ...STYLES.row, paddingVertical: 8, paddingHorizontal: 0 }}
				onPress={() => handleClick(participantInfo.email)}
				disabled={!userIsOwner || !participantInfo.accessLevel}
			>
				<Image
					style={STYLES.tinyParticipantImg}
					source={
						participantInfo.photoUrl
							? { uri: participantInfo.photoUrl }
							: userLogoDefault
					}
				/>
				<View
					style={{
						justifyContent: "center",
						alignItems: "stretch",
						flex: 1,
					}}
				>
					<View
						style={{
							...STYLES.row,
							justifyContent: "space-between",
							alignSelf: "stretch",
						}}
					>
						<Text
							style={{
								...STYLES.userName,
								color: "rgba(0, 0, 0, 0.7)",
							}}
						>
							{participantInfo.name}
						</Text>
						{userIsOwner ? (
							<View
								style={{
									...STYLES.row,
									alignSelf: "flex-end",
									padding: 3,
								}}
							>
								<Text
									style={{
										...STYLES.userEmail,
										fontWeight: "bold",
										fontStyle: participantInfo.accessLevel
											? "normal"
											: "italic",
									}}
								>
									{accessLevelWords[participantInfo.accessLevel]}
								</Text>
								{!!participantInfo.accessLevel && (
									<MaterialIcons
										name="keyboard-arrow-down"
										size={18}
										color="black"
									/>
								)}
							</View>
						) : (
							<Text
								style={{
									...STYLES.userEmail,
									fontWeight: "bold",
									fontStyle: "italic",
								}}
							>
								{accessLevelWords[participantInfo.accessLevel]}
							</Text>
						)}
					</View>
					<Text style={STYLES.userEmail}>{participantInfo.email}</Text>
				</View>
			</TouchableOpacity>
		);
};
