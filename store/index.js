import { applyMiddleware, combineReducers, createStore } from "redux";

import MoneyReducer from "./reducers/money.reducer";
// import OperationReducer from "./reducers/operation.reducer";
import thunk from "redux-thunk";
import UserReducer from "./reducers/user.reducer";

const RootReducer = combineReducers({
    money: MoneyReducer,
    user: UserReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))