import { applyMiddleware, combineReducers, createStore } from "redux";

import MoneyReducer from "./reducers/money.reducer";
// import OperationReducer from "./reducers/operation.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
    money: MoneyReducer,
})

export default createStore(RootReducer, applyMiddleware(thunk))