import React, { useState, createContext } from "react";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
	const [banks, setBanks] = useState([]);

	return (
		<BankContext.Provider value={{ banks, setBanks }}>
			{children}
		</BankContext.Provider>
	);
};
