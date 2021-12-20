import { OPERATIONS_DEFAULT } from "../../constants/operationConstants"
import { child, ref, get, set, remove } from "firebase/database";
import { db } from "../../database/firebase"

export const SET_OPERATIONS = 'SET_OPERATIONS'
export const ADD_OPERATION = 'ADD_OPERATION'
export const UPDATE_OPERATION = 'UPDATE_OPERATION'
export const DELETE_OPERATION = 'DELETE_OPERATION'

export const setOperations = (operationsUpdated) => ({
    type: SET_OPERATIONS,
    payload: { ...operationsUpdated }
})


// Thunks

export const getOperations = () => {
    return async dispatch => {

        get(child(ref(db), `users/1234/operations`)).then((snapshot) => {
            if (snapshot.exists()) {
                const operations = snapshot.val()
                dispatch(setOperations(operations))
            } else {
                console.log("No data available");

                set(ref(db, `users/1234/operations`), { ...OPERATIONS_DEFAULT })
                dispatch(setOperations({ ...OPERATIONS_DEFAULT }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const getThreeOperations = () => {
    return async dispatch => {

        get(child(ref(db), `users/1234/operations`)).then((snapshot) => {
            if (snapshot.exists()) {
                const operations = snapshot.val()
                dispatch(setOperations(operations))
            } else {
                console.log("No data available");

                set(ref(db, `users/1234/operations`), { ...OPERATIONS_DEFAULT })
                dispatch(setOperations(OPERATIONS_DEFAULT))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const addOperation = (operationInfo) => {
    return async dispatch => {

        set(ref(db, `users/1234/operations/${operationInfo.name}`), operationInfo);

        dispatch({
            type: ADD_OPERATION,
            payload: { operationInfo }
        })
    }
}

export const updateAccount = (operationName, currency, key, newValue) => {
    return async dispatch => {

        set(ref(db, `users/1234/operations/${operationName}/accounts/${currency}/${key}`), newValue);

        dispatch({
            type: UPDATE_OPERATION,
            payload: { operationName, currency, key, newValue }
        })
    }
}

export const deleteOperation = (operationName) => {
    return async dispatch => {
        remove(ref(db, `users/1234/operations/${operationName}`));

        dispatch({
            type: DELETE_OPERATION,
            payload: { operationName }
        })
    }
}

