import { applyMiddleware, combineReducers, createStore } from "redux";
import FoodReducer from "./reducers/food.reducer";
import MoneyReducer from "./reducers/money.reducer";
// import OperationReducer from "./reducers/operation.reducer";
import thunk from "redux-thunk";
import UserReducer from "./reducers/user.reducer";

const RootReducer = combineReducers({
    food: FoodReducer,
    money: MoneyReducer,
    user: UserReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))