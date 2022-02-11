import React, { useState, createContext } from "react";
export const OperationFormContext = createContext();
const OperationFormContextProvider = (props) => {
	const [type, setType] = useState("Pago");
	const [title, setTitle] = useState("");

	const [fromName, setFromName] = useState("");
	const [fromCurrency, setFromCurrency] = useState("");
	const [fromAmmount, setFromAmmount] = useState(null);

	const [sendToName, setSendToName] = useState("Efectivo");
	const [sendToCurrency, setSendToCurrency] = useState("USD");
	const [sendToAmmount, setSendToAmmount] = useState(null);

	return (
		<OperationFormContext.Provider
			value={{
				type: type,
				setType: setType,

				title: title,
				setTitle: setTitle,

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
			}}
		>
			{props.children}
		</OperationFormContext.Provider>
	);
};
export default OperationFormContextProvider;
