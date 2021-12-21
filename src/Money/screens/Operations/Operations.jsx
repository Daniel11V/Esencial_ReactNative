import { View } from "react-native";

import { OperationList } from "../../components/OperationList/OperationList";
import React from "react";
import { STYLES } from "../../../../constants/styles";

export const Operations = ({ navigation }) => {
	return (
		<View style={{ ...STYLES.screenContainer, paddingTop: 0 }}>
			<OperationList
				handleClickOperation={(operationId) =>
					navigation.push("OperationDetails", { operationId })
				}
				verticalSpace = {true}
			/>
		</View>
	);
};
