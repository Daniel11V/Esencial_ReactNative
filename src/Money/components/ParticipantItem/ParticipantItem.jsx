import { Text, TouchableOpacity, View, Image } from "react-native";
import { STYLES } from "../../../../constants/styles";
import React from "react";
import { COLORS } from "../../../../constants/colors";
import { Feather } from "@expo/vector-icons";

export const ParticipantItem = ({
	participantInfo,
	handleClickParticipant,
	userIsOwner = false,
	isButton = false,
}) => {
	const accessLevelWords = ["Propietario", "Editor", "Lector"];

	return (
		<TouchableOpacity
			style={{ ...STYLES.row, paddingVertical: 8, paddingHorizontal: 0 }}
			onPress={() =>
				handleClickParticipant(isButton ? null : participantInfo.email)
			}
		>
			<View style={{ alignSelf: "stretch", ...STYLES.row, flex: 1 }}>
				{isButton ? (
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
				) : (
					<Image
						style={STYLES.tinyParticipantImg}
						source={{ uri: participantInfo.photoUrl }}
					/>
				)}
				<View
					style={{
						alignSelf: "center",
						justifyContent: "center",
						flex: 1,
					}}
				>
					<Text
						style={{
							...STYLES.userName,
							color: "rgba(0, 0, 0, 0.7)",
							// fontWeight: "bold",
						}}
					>
						{isButton ? participantInfo.title : participantInfo.name}
					</Text>
					{!isButton && (
						<Text style={STYLES.userEmail}>{participantInfo.email}</Text>
					)}
				</View>
			</View>
			{!isButton && (
				<View style={{ alignSelf: "stretch" }}>
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
									fontStyle: participantInfo.accessLevel ? "normal" : "italic",
								}}
							>
								{accessLevelWords[participantInfo.accessLevel]}
							</Text>
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
			)}
		</TouchableOpacity>
	);
};
