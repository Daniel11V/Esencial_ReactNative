import React, { useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addOperation,
	updateAccount,
} from "../../../../../store/actions/money.action";

export const OperationFormContext = createContext();

const OperationFormContextProvider = (props) => {
	const dispatch = useDispatch();
	const registerId = useSelector((state) => state.money.currentRegisterId);
	const bankList = useSelector((state) => state.money.currentRegister.banks);

	const [type, setType] = useState("Pago");
	const [title, setTitle] = useState("");
	const [photo, setPhoto] = useState("");

	const [fromName, setFromName] = useState("Efectivo");
	const [fromCurrency, setFromCurrency] = useState("ARS");
	const [fromAmmount, setFromAmmount] = useState(null);

	const [sendToName, setSendToName] = useState("Efectivo");
	const [sendToCurrency, setSendToCurrency] = useState("USD");
	const [sendToAmmount, setSendToAmmount] = useState(null);

	const uploadOperation = () => {
		const isMovement = !type.localeCompare("Movimiento");
		const isIncome = !type.localeCompare("Ingreso");
		const isPay = !type.localeCompare("Pago");

		const typeNumber = {
			Movimiento: 2,
			Ingreso: 4,
			Pago: 5,
		};

		dispatch(
			addOperation(registerId, {
				type: typeNumber[type],
				title,
				creationDate: Date.now(),
				photo,
				from:
					isPay || isMovement
						? {
								name: fromName,
								currency: fromCurrency,
								ammount: Number(fromAmmount),
						  }
						: null,
				sendTo:
					isIncome || isMovement
						? {
								name: sendToName,
								currency: sendToCurrency,
								ammount: Number(sendToAmmount),
						  }
						: null,
			})
		);

		if (isPay || isMovement) {
			const lastAmmount = bankList[fromName].accounts[fromCurrency].ammount;

			dispatch(
				updateAccount(
					registerId,
					fromName,
					fromCurrency,
					"ammount",
					lastAmmount - Number(fromAmmount)
				)
			);
		}

		if (isIncome || isMovement) {
			const lastAmmount = bankList[sendToName].accounts[sendToCurrency].ammount;

			dispatch(
				updateAccount(
					registerId,
					sendToName,
					sendToCurrency,
					"ammount",
					lastAmmount + Number(sendToAmmount)
				)
			);
		}
	};

	return (
		<OperationFormContext.Provider
			value={{
				type: type,
				setType: setType,

				title: title,
				setTitle: setTitle,

				photo: photo,
				setPhoto: setPhoto,

				fromName: fromName,
				setFromName: setFromName,

				fromCurrency: fromCurrency,
				setFromCurrency: setFromCurrency,

				fromAmmount: fromAmmount,
				setFromAmmount: setFromAmmount,

				sendToName: sendToName,
				setSendToName: setSendToName,

				sendToCurrency: sendToCurrency,
				setSendToCurrency: setSendToCurrency,

				sendToAmmount: sendToAmmount,
				setSendToAmmount: setSendToAmmount,

				uploadOperation: uploadOperation,
			}}
		>
			{props.children}
		</OperationFormContext.Provider>
	);
};
export default OperationFormContextProvider;
