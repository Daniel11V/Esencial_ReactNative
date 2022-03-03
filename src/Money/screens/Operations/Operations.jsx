import { View } from "react-native";
import { OperationList } from "../../components/OperationList/OperationList";
import React from "react";
import { STYLES } from "../../../../constants/styles";
import { FacebookBanner } from "../../components/FacebookBanner/FacebookBanner";

export const Operations = ({ navigation }) => {
	return (
		<View style={{ flex: 1 }}>
			<FacebookBanner />
			<View style={{ ...STYLES.screenContainer, paddingTop: 0 }}>
				<OperationList
					handleClickOperation={(operationId) =>
						navigation.push("OperationDetails", { operationId })
					}
					verticalSpace={true}
					withMonths
				/>
			</View>
		</View>
	);
};
