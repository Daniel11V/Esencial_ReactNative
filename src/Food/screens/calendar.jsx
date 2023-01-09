import React from "react";
import { FoodNavigation } from "../components/FoodNavigation";
export const Calendar = ({ navigation }) => {
    return (<View forceInset="top">
        <FoodNavigation navigation={navigation} />
    </View>);
}