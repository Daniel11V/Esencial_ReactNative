import React, { createContext, useState } from "react";

import { BANKSDEFAULT } from "../../../constants/banksDefault";
import { useEffect } from "react/cjs/react.development";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
	const [banks, setBanks] = useState([...BANKSDEFAULT]);

	return (
		<BankContext.Provider value={{ banks, setBanks }}>
			{children}
		</BankContext.Provider>
	);
};
