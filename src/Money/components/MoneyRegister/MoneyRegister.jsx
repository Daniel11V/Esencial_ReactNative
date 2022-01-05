import {
	Pressable,
	Text,
	View,
	Modal,
	TextInput,
	FlatList,
	Alert,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { STYLES } from "../../../../constants/styles";
import { COLORS } from "../../../../constants/colors";
import {
	createMoneyRegister,
	deleteMoneyRegister,
	getMoneyRegister,
	leaveMoneyRegister,
	sendMoneyRegisterInvitation,
} from "../../../../store/actions/money.action";
import { ParticipantItem } from "../ParticipantItem/ParticipantItem";

export const MoneyRegister = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const loadingFirstView = useSelector((state) => state.money.loadingFirstView);
	const availableRegisters = useSelector(
		(state) => state.money.availableRegisters
	);
	const currentRegisterId = useSelector(
		(state) => state.money.currentRegisterId
	);
	const personalRegisterId = useSelector(
		(state) => state.money.personalRegisterId
	);
	const currentRegister = useSelector((state) => state.money.currentRegister);

	const [registerSelected, setRegisterSelected] = useState("0");
	const [modalNewRegister, setModalNewRegister] = useState(false);
	const [newRegisterName, setNewRegisterName] = useState("");

	const [modalParticipants, setModalParticipants] = useState(false);
	const [userIsOwner, setUserIsOwner] = useState(false);
	const [modalShare, setModalShare] = useState(false);
	const [emailToShare, setEmailToShare] = useState("");

	const [incomplete, setIncomplete] = useState({
		newRegisterName: false,
		emailToShare: false,
	});

	const pickerRegister = useRef();

	useEffect(() => {
		if (
			currentRegisterId.length &&
			currentRegisterId.localeCompare(registerSelected)
		) {
			setRegisterSelected(currentRegisterId);

			setUserIsOwner(
				Object.values(currentRegister.participants).find(
					(part) => !part.email.localeCompare(user.email)
				)?.accessLevel === 0
			);
		}
	}, [currentRegisterId]);

	const changeRegisterSelected = (newRegisterId) => {
		if (!newRegisterId.localeCompare("1")) {
			setModalNewRegister(true);
		} else if (
			!!newRegisterId.localeCompare(registerSelected) &&
			!loadingFirstView
		) {
			dispatch(getMoneyRegister(newRegisterId));
		}
	};

	const onCreateRegister = () => {
		if (newRegisterName.length) {
			dispatch(createMoneyRegister(newRegisterName, user));
			setModalNewRegister(false);
			setNewRegisterName("");
		}
		setIncomplete((v) => ({
			...v,
			newRegisterName: !newRegisterName.length,
		}));
	};

	const handlePressParticipant = () => {};

	const onAddParticipant = () => {
		if (emailToShare.length) {
			sendMoneyRegisterInvitation(
				emailToShare,
				currentRegisterId,
				currentRegister.name,
				1,
				user
			);

			Alert.alert(
				"Invitación enviada con exito!",
				"Aguardando confirmación para añadir al registro.",
				[{ text: "OK" }]
			);
			setModalShare(false);
			setEmailToShare("");
		}
		setIncomplete((v) => ({
			...v,
			emailToShare: !emailToShare.length,
		}));
	};

	const handleLeave = () => {
		Alert.alert(
			"Confirmar acción irreversible",
			`Esta seguro que desea salir del registro "${currentRegister.name}" ?`,
			[
				{ text: "Cancelar", style: "cancel" },
				{ text: "Confirmar", onPress: onLeaveRegister },
			]
		);
	};

	const onLeaveRegister = () => {
		dispatch(
			leaveMoneyRegister(
				user,
				currentRegisterId,
				availableRegisters,
				currentRegister.participants,
				personalRegisterId
			)
		);
		setModalParticipants(false);
	};

	const handleDelete = () => {
		Alert.alert(
			"Confirmar acción irreversible",
			`Esta seguro que desea eliminar el registro "${currentRegister.name}" ?`,
			[
				{ text: "Cancelar", style: "cancel" },
				{ text: "Confirmar", onPress: onDeleteRegister },
			]
		);
	};

	const onDeleteRegister = () => {
		dispatch(
			deleteMoneyRegister(
				currentRegisterId,
				currentRegister,
				availableRegisters,
				personalRegisterId,
				user
			)
		);
		setModalParticipants(false);
	};

	return (
		<View style={STYLES.row}>
			<Pressable
				style={{
					...STYLES.row,
					paddingBottom: 15,
					flex: 1,
					justifyContent: "flex-start",
				}}
				onPress={() => pickerRegister.current.focus()}
			>
				<Text style={{ ...STYLES.bigTitle, marginRight: 5, flexShrink: 1 }}>
					{currentRegister.name?.length ? currentRegister.name : "Cargando..."}
				</Text>
				<MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
				<Picker
					selectedValue={registerSelected}
					onValueChange={changeRegisterSelected}
					ref={pickerRegister}
					prompt="Ver registro de cuentas de..."
					style={STYLES.invisible}
				>
					<Picker.Item
						label={`   ${user.name}`}
						value={personalRegisterId}
						style={{
							...STYLES.bigText,
							backgroundColor: !registerSelected.localeCompare(
								personalRegisterId
							)
								? COLORS.tinyGray
								: "#fff",
						}}
					/>
					{Object.keys(availableRegisters).map((registerId, key) => (
						<Picker.Item
							key={key}
							label={`   ${availableRegisters[registerId].name}`}
							value={registerId}
							style={{
								...STYLES.bigText,
								backgroundColor: !registerSelected.localeCompare(registerId)
									? COLORS.tinyGray
									: "#fff",
							}}
						/>
					))}
					<Picker.Item
						label="   Crear nuevo registro..."
						value="1"
						style={STYLES.bigText}
					/>
				</Picker>
			</Pressable>
			<Modal
				visible={modalNewRegister}
				transparent={true}
				onRequestClose={() => {
					setModalNewRegister(false);
					setNewRegisterName("");
				}}
			>
				<Pressable
					onPress={() => {
						setModalNewRegister(false);
						setNewRegisterName("");
					}}
					style={{ ...STYLES.modal, backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<Pressable
						onPress={() => {}}
						style={{
							width: "90%",
							padding: 20,
							paddingBottom: 10,
							position: "relative",
							backgroundColor: "#fff",
							borderRadius: 15,
						}}
					>
						<TextInput
							placeholder="Nombre del registro de cuentas"
							style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 5 }}
							maxLength={65}
							selectionColor={COLORS.primary}
							value={newRegisterName}
							onChangeText={(text) => setNewRegisterName(text)}
						/>
						{incomplete.newRegisterName && (
							<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
						)}
						<TouchableOpacity
							onPress={onCreateRegister}
							style={{
								...STYLES.btnPrimary,
								paddingVertical: 5,
								marginTop: 15,
							}}
						>
							<Text style={STYLES.btnPrimaryText}>Crear</Text>
						</TouchableOpacity>
					</Pressable>
				</Pressable>
			</Modal>
			<Pressable
				style={{
					padding: 10,
					paddingBottom: 20,
					paddingLeft: 15,
				}}
				onPress={() => setModalParticipants(true)}
			>
				<Feather name="users" size={24} color="black" />
			</Pressable>
			<Modal visible={modalParticipants} transparent={true}>
				<Pressable
					onPress={() => setModalParticipants(false)}
					style={{ ...STYLES.modal, backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<Pressable
						onPress={() => {}}
						style={{
							width: "90%",
							minHeight: "30%",
							paddingTop: 20,
							paddingHorizontal: 15,
							paddingBottom: 10,
							position: "relative",
							backgroundColor: "#fff",
							borderRadius: 15,
						}}
					>
						<Text
							style={{
								fontSize: 14,
								color: "rgba(0, 0, 0, 0.6)",
								fontWeight: "bold",
								padding: 15,
								paddingTop: 5,
							}}
						>
							{Object.keys(currentRegister.participants)?.length === 1
								? `${
										Object.keys(currentRegister.participants)?.length
								  } participante`
								: `${
										Object.keys(currentRegister.participants)?.length
								  } participantes`}
						</Text>
						<ParticipantItem
							participantInfo={{ title: "Añadir participantes" }}
							handleClick={() => setModalShare(true)}
							userIsOwner={userIsOwner}
							isButton={true}
						/>
						<FlatList
							data={Object.values(currentRegister.participants)}
							style={STYLES.flatListSetup}
							renderItem={(data) => (
								<ParticipantItem
									participantInfo={data.item}
									handleClick={handlePressParticipant}
									userIsOwner={userIsOwner}
								/>
							)}
							keyExtractor={(item) => item.email}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							nestedScrollEnabled
						/>
						{!!personalRegisterId.localeCompare(currentRegisterId) && (
							<View
								style={{
									borderTopWidth: 1,
									borderColor: "rgba(0,0,0,0.4)",
									paddingTop: 5,
									marginTop: 10,
								}}
							>
								{userIsOwner ? (
									<ParticipantItem
										participantInfo={{ title: "Eliminar registro" }}
										handleClick={handleDelete}
										userIsOwner={userIsOwner}
										isButton={true}
									/>
								) : (
									<ParticipantItem
										participantInfo={{ title: "Salir del registro" }}
										handleClick={handleLeave}
										userIsOwner={userIsOwner}
										isButton={true}
									/>
								)}
							</View>
						)}
					</Pressable>
				</Pressable>
			</Modal>
			<Modal
				visible={modalShare}
				transparent={true}
				onRequestClose={() => {
					setModalShare(false);
					setEmailToShare("");
				}}
			>
				<Pressable
					onPress={() => {
						setModalShare(false);
						setEmailToShare("");
					}}
					style={{ ...STYLES.modal, backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<Pressable
						onPress={() => {}}
						style={{
							width: "90%",
							padding: 20,
							position: "relative",
							backgroundColor: "#fff",
							borderRadius: 15,
							paddingBottom: 10,
						}}
					>
						<TextInput
							placeholder="Email del usuario"
							style={{ ...STYLES.textInput, flexGrow: 1, marginTop: 5 }}
							maxLength={80}
							selectionColor={COLORS.primary}
							value={emailToShare}
							keyboardType="email-address"
							autoCapitalize="none"
							onChangeText={(text) => setEmailToShare(text)}
						/>
						{incomplete.emailToShare && (
							<Text style={STYLES.incompleteInput}>Campo Requerido</Text>
						)}
						<TouchableOpacity
							onPress={onAddParticipant}
							style={{
								...STYLES.btnPrimary,
								paddingVertical: 5,
								marginTop: 15,
							}}
						>
							<Text style={STYLES.btnPrimaryText}>Enviar invitación</Text>
						</TouchableOpacity>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
};
