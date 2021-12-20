import { SafeAreaView } from "react-native";

import { OperationList } from "../../components/OperationList/OperationList";
import React from "react";
import { STYLES } from "../../../../constants/styles";

export const Operations = ({ navigation }) => {
	return (
		<SafeAreaView
			style={{ ...STYLES.screenContainer, flex: 1 }}
			forceInset="top"
		>
			<OperationList
				handleClickOperation={(operationId) =>
					navigation.push("OperationDetails", { operationId })
				}
			/>
		</SafeAreaView>
	);
};
