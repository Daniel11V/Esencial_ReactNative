import React, { useState }  from "react";
import { Pressable,
	Text,
	View,
	SafeAreaView 
} from "react-native";
import { STYLES } from "../../../constants/styles";
import { COLORS } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FoodNavigation } from "../components/FoodNavigation";
import { setFavorite, setFavoriteDB } from "../../../store/actions/food.action";

export const Recipe = ({ route, navigation }) => {
	const { recipeId } = route.params;
	const {recipeList, favorites} = useSelector((state) => state.food);
    const recipe = recipeList.find(recipe => recipe.id === recipeId)
    const dispatch = useDispatch();
    const [recipeText, setRecipeText] = useState("ingredients")

	const isFavorite = (recipeId) => favorites.includes(recipeId);
    
    const toggleFavorite = () => dispatch(setFavorite(recipe.id, !isFavorite(recipe.id)))

	return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={STYLES.boxesContainer}>
                <Text
                    style={{
                        ...STYLES.bigText,
                        fontWeight: "bold",
                    }}
                >
                    {recipe.name} 
                    
                </Text>
                           
                {/* tengo que agregar un pressable que modifique el favourites para agregar o quitar la receta de la lista de favoritos */}
                <Pressable
                onPress={toggleFavorite}>
                {isFavorite(recipe.id) ? (
                        <Ionicons
                        name="heart"
                        size={25}
                        color={COLORS.lightGray}
                        />
                        ) : (
                        <Ionicons
                        name="heart-outline"
                        size={25}
                        color={COLORS.lightGray}
                        />
                        )
                }
                </Pressable>
                    
                
                {/* agregar la receta al calendario  */}
                <Pressable
                    OnPress={() => navigation.push("Calendar")}
                >
                    <Ionicons
                    name="calendar"
                    size={25}
                    color={COLORS.lightGray}
                    />
                </Pressable>
                <Text
                    style={{
                        ...STYLES.normalText,
                    }}
                >
                    {recipe.description} 
                    
                </Text>
                <Pressable
                    onPress={() => setRecipeText("ingredients")}
                >
                    <Text
                        style={{
                            ...STYLES.subtitle,
                        }}
                    >
                        ingredientes
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => setRecipeText("steps")}
                >
                    <Text
                        style={{
                            ...STYLES.subtitle,
                        }}
                    >
                        Pasos
                    </Text>
                </Pressable>
                
                {recipeText == "steps" ?  
                    (<View>
                        {recipe.steps.map((step, key) => (
                            <Text key={key}>
                                {key += 1}{step}
                            </Text>
                        ))}
                    </View>) :
                    (<View>
                        {recipe.ingredients.map((ingredient, key) => (
                            <Text key={key}>
                                {ingredient.id}{ingredient.quantity}
                            </Text>
                        ))}
                    </View>)
                }
            </View>
            <FoodNavigation navigation={navigation} />
	    </SafeAreaView>
    );
};