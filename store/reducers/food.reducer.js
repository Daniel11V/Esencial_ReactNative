import {
    END_LOADING,
    SET_FAVORITE
} from "../actions/food.action"

const initialState = {
    recipeList:[
        {
            id:"1",
            name:"milanesa con pure de papa",
            img:"",
            labels:["minutas"],
            description:'"una buena mila con pure riquisima"',
            steps:["colocar aceite en la bandeja donde ira la milanesa","encender el horono a temperatura media","colocar la milanesa dentro de la bandeja e introducirla en el horno durante 8 minutos","dar vuelta la milanesa y volver a introducirla en el horno durante 3:30 minutos mas", "poner la leche en una caserola y dejar al fuego hasta que hierva", "una vez que la leche este hirviendo apagar el fuego y poner el pure cheff", "agregar sal, nues moscada y manteca o queso y revolver hasta que no se distingas los ingredientes"],
            ingredients:[
                {
                    id:"8",
                    quantity:"1"
                },
                {
                    id:"9",
                    quantity:"500"
                }
            ]
        },
        {
            id:"2",
            name:"salchicha con pure",
            img:"",
            labels:["minutas"],
            description:"una buena salchichona con pure",
            steps:["hacer la salchicha", "hacer el pure", "unirlo", "tachan"],
            ingredients:[
                {
                    id:"10",
                    quantity:"6"
                },
                {
                    id:"9",
                    quantity:"500"
                }
            ]
        },
        {
            id:"3",
            name:"pizza",
            img:"",
            labels:["pizza"],
            description:"a la italiana",
            steps:["hacer maza", "poner queso", "calentar"],
            ingredients:[
                {
                    id:"maza",
                    quantity:"1"
                },
                {
                    id:"queso",
                    quantity:"500"
                }
            ]
        }
    ],
    recipe: {
        name:"",
        img:"",
        labels:[],
        description:"",
        steps:[],
        ingredients:{
            id:"",
            quantity:""
        }
    },
    favorites: [], 
    ingredientList:[
        {
            id:"1",
            name: "Carne",
            img:"",
            description:"cruda",
            medUnities:"unidades"
        },
        {
            id:"2",
            name: "Manzana",
            img:"",
            description:"apetitosa",
            units:"unidades"
        },
        {
            id:"3",
            name: "leche",
            img:"",
            description:"blanca",
            medUnities:"litros"
        },
        {
            id:"4",
            name: "azucar",
            img:"",
            description:"",
            medUnities:"cuchara"
        },
        {
            id:"5",
            name: "huevo",
            img:"",
            description:"los que te faltan",
            medUnities:"unidades"
        },
        {
            id:"6",
            name: "maza",
            img:"",
            description:"pan",
            medUnities:"unidades"
        },
        {
            id:"7",
            name: "queso",
            img:"",
            description:"frances",
            medUnities:"gramos"
        },
        {
            id:"8",
            name: "milanesa",
            img:"",
            description:"rica",
            medUnities:"unidades"
        },
        {
            id:"9",
            name: "pure cheff",
            img:"",
            description:"seco",
            medUnities:"gramos"
        },
        {
            id:"10",
            name: "salchicha",
            img:"",
            description:"larga",
            medUnities:"unidades"
        }
    ]
}

const FoodReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case END_LOADING:
            return { ...state, loadingFirstView: payload.loadingState }
        case SET_FAVORITE:
            return { 
                ...state, 
                favorites: payload.toFavorite ? 
                    [...state.favorites, payload.recipeId] : 
                    state.favorites.filter(recipeId => recipeId !== payload.recipeId)
            }
        default:
            return state
    }
}

export default FoodReducer