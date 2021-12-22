import { child, ref, get, set, remove } from "firebase/database";
import { db } from "../../database/firebase"
import { BANKS_DEFAULT } from "../../constants/bankConstants"
import { OPERATIONS_DEFAULT } from "../../constants/operationConstants";
import * as FileSystem from 'expo-file-system'

export const END_LOADING = 'END_LOADING'

export const SET_BANKS = 'SET_BANKS'
export const ADD_BANK = 'ADD_BANK'
export const DELETE_BANK = 'DELETE_BANK'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'

export const SET_OPERATIONS = 'SET_OPERATIONS'
export const ADD_OPERATION = 'ADD_OPERATION'
export const UPDATE_OPERATION = 'UPDATE_OPERATION'
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

export const getFirstView = (userId) => {
    return async dispatch => {

        await get(child(ref(db), `users/${userId}/banks`)).then((snapshot) => {
            if (snapshot.exists()) {
                const banks = snapshot.val()
                dispatch(setBanks(banks))
            } else {
                console.log("No data available");

                set(ref(db, `users/${userId}/banks`), { ...BANKS_DEFAULT })
                dispatch(setBanks(BANKS_DEFAULT))
            }
        }).catch((error) => {
            console.error(error);
        });

        await get(child(ref(db), `users/${userId}/operations`)).then((snapshot) => {
            if (snapshot.exists()) {
                const operations = snapshot.val()
                dispatch(setOperations(operations))
            } else {
                console.log("No data available");

                set(ref(db, `users/${userId}/operations`), { ...OPERATIONS_DEFAULT })
                dispatch(setOperations({ ...OPERATIONS_DEFAULT }))
            }
        }).catch((error) => {
            console.error(error);
        });

        dispatch(endLoading())
    }
}

export const getBanks = (userId) => {
    return async dispatch => {

        get(child(ref(db), `users/${userId}/banks`)).then((snapshot) => {
            if (snapshot.exists()) {
                const banks = snapshot.val()
                dispatch(setBanks(banks))
            } else {
                console.log("No data available");

                set(ref(db, `users/${userId}/banks`), { ...BANKS_DEFAULT })
                dispatch(setBanks(BANKS_DEFAULT))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const addBank = (userId, bankInfo) => {
    return async dispatch => {

        set(ref(db, `users/${userId}/banks/${bankInfo.name}`), bankInfo);

        dispatch({
            type: ADD_BANK,
            payload: { bankInfo }
        })
    }
}

export const addAccount = (userId, bankName, newAccount) => {
    return async dispatch => {

        set(ref(db, `users/${userId}/banks/${bankName}/accounts/${newAccount.currency}`), newAccount);

        dispatch({
            type: ADD_ACCOUNT,
            payload: { bankName, newAccount }
        })
    }
}

export const updateAccount = (userId, bankName, currency, key, newValue) => {
    return async dispatch => {

        set(ref(db, `users/${userId}/banks/${bankName}/accounts/${currency}/${key}`), newValue);

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: { bankName, currency, key, newValue }
        })
    }
}

export const deleteBank = (userId, bankName) => {
    return async dispatch => {
        remove(ref(db, `users/${userId}/banks/${bankName}`));

        dispatch({
            type: DELETE_BANK,
            payload: { bankName }
        })
    }
}

export const deleteAccount = (userId, bankName, accountName) => {
    return async dispatch => {
        remove(ref(db, `users/${userId}/banks/${bankName}/accounts/${accountName}`));

        dispatch({
            type: DELETE_ACCOUNT,
            payload: { bankName, accountName }
        })
    }
}

export const getOperations = (userId) => {
    return async dispatch => {

        get(child(ref(db), `users/${userId}/operations`)).then((snapshot) => {
            if (snapshot.exists()) {
                const operations = snapshot.val()
                dispatch(setOperations(operations))
            } else {
                console.log("No data available");

                set(ref(db, `users/${userId}/operations`), { ...OPERATIONS_DEFAULT })
                dispatch(setOperations({ ...OPERATIONS_DEFAULT }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const addOperation = (userId, operationInfo) => {
    return async dispatch => {

        let operationInfoFinal = JSON.parse(JSON.stringify(operationInfo))

        if (operationInfoFinal.type === 5) {

            let Path = ""
            if (operationInfoFinal.photo?.length > 0) {
                const fileName = operationInfoFinal.photo.split('/').pop()
                Path = FileSystem.documentDirectory + fileName

                try {
                    FileSystem.moveAsync({
                        from: operationInfoFinal.photo,
                        to: Path
                    })
                } catch (err) {
                    console.log(err.message)
                    throw err
                }
            }
            operationInfoFinal = { ...operationInfo, photo: Path }
        }

        set(ref(db, `users/${userId}/operations/${operationInfo.creationDate}`), operationInfoFinal);

        dispatch({
            type: ADD_OPERATION,
            payload: { operationInfo: operationInfoFinal }
        })
    }
}

export const updateOperation = (userId, operationId, key, newValue) => {
    return async dispatch => {

        let newValueFinal = newValue;

        if (key === 'photo') {

            if (newValue.length > 0) {

                const fileName = newValue.split('/').pop()
                newValueFinal = FileSystem.documentDirectory + fileName

                try {
                    FileSystem.moveAsync({
                        from: newValue,
                        to: newValueFinal
                    })
                } catch (err) {
                    console.log(err.message)
                    throw err
                }
            }
        }

        set(ref(db, `users/${userId}/operations/${operationId}/${key}`), newValueFinal);

        dispatch({
            type: UPDATE_OPERATION,
            payload: { operationId, key, newValue: newValueFinal }
        })
    }
}

export const deleteOperation = (userId, operationId) => {
    return async dispatch => {
        remove(ref(db, `users/${userId}/operations/${operationId}`));

        dispatch({
            type: DELETE_OPERATION,
            payload: { operationId }
        })
    }
}
