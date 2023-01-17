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
        const [name, setName] = useState(null);
        const [description, setDescription] = useState(null);
        const [ingrName, setIngrName] = useState(null);
        const [quantity, setQuantity] = useState(null);
        const [measureType, setMeasureType] = useState(null);
        
        const addStep = () => {
            return (<TextInput
                placeholder="nombre"
                style={{ ...STYLES.textInput, flexGrow: 1 }}
                maxLength={25}
                selectionColor={COLORS.primary}
                value={name}
                keyboardType="default"
                onChangeText={(newName) => setName(newName)}
            />)
        }

    
        const measures = ["gramos","kilogramos","litros","mililitros","unidades"]
    return (<SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View forceInset="top" style={{marginBottom:80}}>
                        <Text>nombre de la receta</Text>
                        <TextInput
                            placeholder="nombre"
                            style={{ ...STYLES.textInput, flexGrow: 1 }}
                            maxLength={25}
                            selectionColor={COLORS.primary}
                            value={name}
                            keyboardType="default"
                            onChangeText={(newName) => setName(newName)}
                        />
                        <Text>descripcion de la reseta</Text>
                        <TextInput
                            placeholder="descripcion"
                            multiline
                            numberOfLines={3}
                            style={{ ...STYLES.foodTextInput, flexGrow: 1 }}
                            maxLength={100}
                            selectionColor={COLORS.primary}
                            value={description}
                            keyboardType="default"
                            onChangeText={(newDescription) => setDescription(newDescription)}
                            
                        />
                        <Text>pasos de la reseta</Text>
                        <Pressable
                            onPress={() => addStep()}>
                                <Ionicons
                                name="add"
                                size={25}
                                color={COLORS.lightGray}>
                                </Ionicons>
                            </Pressable>
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
            </SafeAreaView>);
}