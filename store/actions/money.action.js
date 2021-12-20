import { child, ref, get, set, remove } from "firebase/database";
import { db } from "../../database/firebase"
import { BANKS_DEFAULT } from "../../constants/bankConstants"
import { OPERATIONS_DEFAULT } from "../../constants/operationConstants";

export const END_LOADING = 'END_LOADING'

export const SET_BANKS = 'SET_BANKS'
export const ADD_BANK = 'ADD_BANK'
export const DELETE_BANK = 'DELETE_BANK'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'

export const SET_OPERATIONS = 'SET_OPERATIONS'
export const ADD_OPERATION = 'ADD_OPERATION'
export const DELETE_OPERATION = 'DELETE_OPERATION'

export const endLoading = () => ({
    type: END_LOADING,
    payload: { loadingState: false }
})

export const setBanks = (banksUpdated) => ({
    type: SET_BANKS,
    payload: { banksUpdated }
})

export const setOperations = (operationsUpdated) => ({
    type: SET_OPERATIONS,
    payload: { operationsUpdated }
})

// Thunks

export const getFirstView = () => {
    return async dispatch => {

        await get(child(ref(db), `users/1234/banks`)).then((snapshot) => {
            if (snapshot.exists()) {
                const banks = snapshot.val()
                dispatch(setBanks(banks))
            } else {
                console.log("No data available");

                set(ref(db, `users/1234/banks`), { ...BANKS_DEFAULT })
                dispatch(setBanks(BANKS_DEFAULT))
            }
        }).catch((error) => {
            console.error(error);
        });

        await get(child(ref(db), `users/1234/operations`)).then((snapshot) => {
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

        dispatch(endLoading())
    }
}

export const getBanks = () => {
    return async dispatch => {

        get(child(ref(db), `users/1234/banks`)).then((snapshot) => {
            if (snapshot.exists()) {
                const banks = snapshot.val()
                dispatch(setBanks(banks))
            } else {
                console.log("No data available");

                set(ref(db, `users/1234/banks`), { ...BANKS_DEFAULT })
                dispatch(setBanks(BANKS_DEFAULT))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const addBank = (bankInfo) => {
    return async dispatch => {

        set(ref(db, `users/1234/banks/${bankInfo.name}`), bankInfo);

        dispatch({
            type: ADD_BANK,
            payload: { bankInfo }
        })
    }
}

export const addAccount = (bankName, newAccount) => {
    return async dispatch => {

        set(ref(db, `users/1234/banks/${bankName}/accounts/${newAccount.currency}`), newAccount);

        dispatch({
            type: ADD_ACCOUNT,
            payload: { bankName, newAccount }
        })
    }
}

export const updateAccount = (bankName, currency, key, newValue) => {
    return async dispatch => {

        set(ref(db, `users/1234/banks/${bankName}/accounts/${currency}/${key}`), newValue);

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: { bankName, currency, key, newValue }
        })
    }
}

export const deleteBank = (bankName) => {
    return async dispatch => {
        remove(ref(db, `users/1234/banks/${bankName}`));

        dispatch({
            type: DELETE_BANK,
            payload: { bankName }
        })
    }
}

export const deleteAccount = (bankName, accountName) => {
    return async dispatch => {
        remove(ref(db, `users/1234/banks/${bankName}/accounts/${accountName}`));

        dispatch({
            type: DELETE_ACCOUNT,
            payload: { bankName, accountName }
        })
    }
}

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

export const addOperation = (operationInfo) => {
    return async dispatch => {

        set(ref(db, `users/1234/operations/${operationInfo.creationDate}`), operationInfo);

        dispatch({
            type: ADD_OPERATION,
            payload: { operationInfo }
        })
    }
}

export const deleteOperation = (operationId) => {
    return async dispatch => {
        remove(ref(db, `users/1234/operations/${operationId}`));

        dispatch({
            type: DELETE_OPERATION,
            payload: { operationId }
        })
    }
}
