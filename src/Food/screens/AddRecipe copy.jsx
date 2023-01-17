import React from "react";
import { Pressable,
	Text,
	View } from "react-native";
import { STYLES } from "../../../constants/styles";
import { COLORS } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { FOOD_LABELS } from "../../../constants/foodConstants";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodNavigation } from "../components/FoodNavigation";
import { useState, useRef, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

export const AddRecipe = ({navigation}) => {
    const measures = ["gramos","kilogramos","litros","mililitros","unidades"]

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [ingrName, setIngrName] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [measureType, setMeasureType] = useState(null);
    // const [steps, setSteps] = useState(["1. "]);
    
    // const addStep = () => {
    //     setSteps(lastSteps => [...lastSteps, (lastSteps.length + 1) + ". "] )
    // }

    // const editStep = (stepId, stepEditted) => {
    //     if (stepEditted.length > 2) {
    //         setSteps(lastSteps => lastSteps.map((step, index) => index === stepId ? stepEditted : step))
    //     }
    // }

    // const removeStep = (stepId) => {
    //     setSteps(lastSteps => 
    //         lastSteps
    //             .filter((_step, index) => index !== stepId)
    //             .map((step, index) => index + step.slice(1))
    //     )
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View forceInset="top" style={{marginBottom:80}}>
                    <Text>Nombre de la reseta</Text>
                    <TextInput
                        placeholder="nombre"
                        style={{ ...STYLES.textInput, flexGrow: 1 }}
                        maxLength={50}
                        selectionColor={COLORS.primary}
                        value={name}
                        keyboardType="default"
                        onChangeText={(newName) => setName(newName)}
                    />
                    <Text>Descripcion de la reseta</Text>
                    <TextInput
                        placeholder="descripcion"
                        multiline
                        style={{ ...STYLES.foodTextInput, flexGrow: 1 }}
                        maxLength={100}
                        selectionColor={COLORS.primary}
                        value={description}
                        keyboardType="default"
                        onChangeText={(newDescription) => setDescription(newDescription)}
                        
                    />
                    <Text>Pasos de la reseta</Text>
                    {/* {steps.map((step, stepId) => (
                        <View key={stepId} style={{display: "flex"}}>
                            <TextInput
                                style={{ ...STYLES.textInput, flexGrow: 1 }}
                                maxLength={300}
                                selectionColor={COLORS.primary}
                                multiline
                                value={step}
                                keyboardType="default"
                                onChangeText={stepEditted => editStep(stepId, stepEditted)}
                            />
                            <Pressable onPress={()=>removeStep(stepId)} style={{marginLeft: "2px"}}>
                                <Ionicons
                                    name="md-trash"
                                    size={25}
                                    color={COLORS.lightGray} />
                            </Pressable>
                        </View>
                        
                    ))} */}
                    {/* <Pressable onPress={addStep} style={{background: COLORS.lightGray, width: "100%"}}>
                        <Ionicons
                            name="add"
                            size={25}
                            color={COLORS.lightGray} />
                    </Pressable> */}
                    <Text>ingredientes de la reseta</Text>
                    <TextInput
                        placeholder="nombre"
                        style={{ ...STYLES.textInput, flexGrow: 1 }}
                        maxLength={10}
                        selectionColor={COLORS.primary}
                        value={ingrName}
                        keyboardType="default"
                        onChangeText={(newIngrName) => setIngrName(newIngrName)}
                    />
                    <TextInput
                        placeholder="cantidad"
                        style={{ ...STYLES.textInput, flexGrow: 1 }}
                        maxLength={4}
                        selectionColor={COLORS.primary}
                        value={quantity}
                        keyboardType="numeric"
                        onChangeText={(newQuantity) => setQuantity(newQuantity)}
                    />
                    <Picker 
                        selectedValue={measureType}
                        onValueChange={(text) => setMeasureType(text)}
                        mode="dropdown"
                    >
                        <Picker.Item
                                label="unidad de medida*"
                                value=""
                                style={{ ...STYLES.bigText, color: COLORS.lightGray }}
                            />
                            {measures.map((measure, key) => (
                                <Picker.Item
                                    key={key}
                                    label={measure}
                                    value={measure}
                                    style={STYLES.bigText}
                                />
                            ))}
                    </Picker>
                    <Text>categoria de la reseta</Text>
                    <Pressable></Pressable>
                    <Pressable ></Pressable>
                </View>
            </ScrollView>
            <FoodNavigation navigation={navigation} />
        </SafeAreaView>
    );
}