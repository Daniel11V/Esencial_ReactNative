import React, { createContext, useState } from "react";

import { BANKSDEFAULT } from "../../../constants/banksDefault";
import { useEffect } from "react/cjs/react.development";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
	const [banks, setBanks] = useState([...BANKSDEFAULT]);

	const setCategory = (bankId, accountId, newCategory) => {
		let newBanks = JSON.parse(JSON.stringify(banks));

		newBanks[bankId].accounts[accountId].category = newCategory;

		setBanks([...newBanks]);
	};

	return (
		<BankContext.Provider value={{ banks, setBanks, setCategory }}>
			{children}
		</BankContext.Provider>
	);
};
