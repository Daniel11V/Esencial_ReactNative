import { child, ref, get, set, remove, push, onValue } from "firebase/database";
import { db } from "../../database/firebase"
import { BANKS_DEFAULT } from "../../constants/bankConstants"
import { OPERATIONS_DEFAULT } from "../../constants/operationConstants";
import * as FileSystem from 'expo-file-system'

export const END_LOADING = 'END_LOADING'

export const SET_MONEY_PERS_REGISTER_ID = 'SET_MONEY_PERS_REGISTER_ID'
export const SET_MONEY_REGISTERS_ID = 'SET_MONEY_REGISTERS_ID'
export const SET_MONEY_REGISTER = 'SET_MONEY_REGISTER'
export const CREATE_MONEY_REGISTER = 'CREATE_MONEY_REGISTER'
export const ADD_MONEY_REGISTER = 'ADD_MONEY_REGISTER'
export const LEAVE_MONEY_REGISTER = 'LEAVE_MONEY_REGISTER'
export const DELETE_MONEY_LOCAL_DATA = 'DELETE_MONEY_LOCAL_DATA'

export const SET_MONEY_NOTIFICATIONS = 'SET_MONEY_NOTIFICATIONS'
export const DELETE_MONEY_NOTIFICATION = 'DELETE_MONEY_NOTIFICATION'

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

export const deleteMoneyLocalData = () => ({
    type: DELETE_MONEY_LOCAL_DATA,
    payload: {}
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

export const getPersonalRegisterFirstView = (user) => {
    return async dispatch => {
        try {

            // const moneyRegistersRef = query(ref(db, 'money-registers'), orderByChild('ownerId'), equalTo("8653738749034139"))
            onValue(ref(db, `users/${user.id}/personalMoneyRegisterId`), (snapshot) => {
                if (snapshot.exists()) {
                    // snapshot.forEach((childSnapshot) => {
                    //     const childKey = childSnapshot.key;
                    //     const childData = childSnapshot.val();
                    //     // ...
                    // });
                    const personalMoneyRegisterId = snapshot.val()

                    dispatch({
                        type: SET_MONEY_PERS_REGISTER_ID,
                        payload: { personalMoneyRegisterId }
                    })
                    dispatch(getAvailableMoneyRegisters(user))
                    if (personalMoneyRegisterId.length) {
                        dispatch(getMoneyRegister(personalMoneyRegisterId))
                    } else {
                        console.log("Error width personalMoneyRegisterId");
                    }
                } else {
                    console.log("No data available (personalMoneyRegisterId)");

                    dispatch(createMoneyRegister(user.name, user))
                }

                dispatch(checkNotifications(user.email))

                dispatch(endLoading())
            }, {
                onlyOnce: true
            });

        } catch (error) {
            console.warn(error);
            dispatch(endLoading())
        }

    }
}

export const getAvailableMoneyRegisters = (user) => {
    return async dispatch => {

        onValue(ref(db, `users/${user.id}/availableMoneyRegisters`), (snapshot) => {
            if (snapshot.exists()) {

                const moneyRegistersId = snapshot.val()

                dispatch({
                    type: SET_MONEY_REGISTERS_ID,
                    payload: { moneyRegistersId }
                })
            } else {
                console.log("No data available (availableMoneyRegisters)");
                dispatch({
                    type: SET_MONEY_REGISTERS_ID,
                    payload: { moneyRegistersId: {} }
                })
            }
        }, { onlyOnce: true });
    }
}

export const getMoneyRegister = (registerId) => {
    return async dispatch => {

        onValue(ref(db, `moneyRegisters/${registerId}`), (snapshot) => {
            if (snapshot.exists()) {

                const moneyRegister = snapshot.val()
                dispatch({
                    type: SET_MONEY_REGISTER,
                    payload: { registerId, moneyRegister }
                })
            } else {
                console.log("No data available (moneyRegister)");
            }
        }, { onlyOnce: true });
    }
}

export const createMoneyRegister = (newRegisterName, user) => {
    return async dispatch => {

        const newRegister = {
            name: newRegisterName,
            participants: {},
            banks: { ...BANKS_DEFAULT },
            operations: { ...OPERATIONS_DEFAULT },
        }
        const newRegisterRef = push(ref(db, `moneyRegisters`))
        set(newRegisterRef, newRegister);
        const newRegisterId = newRegisterRef.key

        const newParticipant = { email: user.email, name: user.name, photoUrl: user.photoUrl, accessLevel: 0 }
        const newParticipantRef = push(ref(db, `moneyRegisters/${newRegisterId}/participants`))
        set(newParticipantRef, newParticipant);
        const newParticipantId = newParticipantRef.key

        const isPersonalRegister = (!newRegisterName.localeCompare(user.name))

        if (isPersonalRegister) {
            set(ref(db, `users/${user.id}/personalMoneyRegisterId`), newRegisterId);
        } else {
            set(ref(db, `users/${user.id}/availableMoneyRegisters/${newRegisterId}`), { id: newRegisterId, name: newRegisterName });
        }

        dispatch({
            type: CREATE_MONEY_REGISTER,
            payload: {
                newRegister: {
                    ...newRegister,
                    participants: {
                        [newParticipantId]: newParticipant
                    }
                }, newRegisterId, isPersonalRegister
            }
        })
    }
}

export const addMoneyRegister = (newMoneyRegister, user) => {
    return async dispatch => {

        set(ref(db, `users/${user.id}/availableMoneyRegisters/${newMoneyRegister.id}`), { id: newMoneyRegister.id, name: newMoneyRegister.name });

        // Add participant to Money Register
        const newParticipant = { email: user.email, name: user.name, photoUrl: user.photoUrl, accessLevel: newMoneyRegister.accessLevel }
        const newParticipantRef = push(ref(db, `moneyRegisters/${newMoneyRegister.id}/participants`))
        set(newParticipantRef, newParticipant);

        dispatch({
            type: ADD_MONEY_REGISTER,
            payload: { newMoneyRegister }
        })

        dispatch(getMoneyRegister(newMoneyRegister.id))
    }
}

export const checkNotifications = (userEmail) => {
    return async dispatch => {

        try {

            // const moneyNotificationsRef = query(ref(db, 'moneyNotifications'), orderByChild('sendToEmail'), equalTo(userEmail))
            onValue(ref(db, 'moneyNotifications'), (snapshot) => {
                if (snapshot.exists()) {
                    let updatedNotifications = {}

                    snapshot.forEach((childSnapshot) => {
                        const notification = childSnapshot.val();
                        if (notification.sendToEmail.includes(userEmail)) {
                            updatedNotifications[childSnapshot.key] = notification
                        }

                    });

                    dispatch({
                        type: SET_MONEY_NOTIFICATIONS,
                        payload: { updatedNotifications }
                    })
                } else {
                    console.log("No data available (notifications)");
                }
            }, {
                onlyOnce: true
            });

        } catch (error) {
            console.warn(error);
        }
    }
}

export const sendMoneyRegisterInvitation = (sendToEmail, registerId, registerName, registerAccessLevel, user) => {

    const newInvitation = {
        type: "Invitation to Money Register",
        moneyRegister: {
            id: registerId,
            name: registerName,
            accessLevel: registerAccessLevel,
        },
        sendToEmail,
        from: {
            name: user.name,
            email: user.email,
        }
    }

    set(push(ref(db, `moneyNotifications`)), newInvitation);
}

export const deleteMoneyNotification = (notificationId) => {
    return async dispatch => {
        remove(ref(db, `moneyNotifications/${notificationId}`));

        dispatch({
            type: DELETE_MONEY_NOTIFICATION,
            payload: { notificationId }
        })
    }
}

export const leaveMoneyRegister = (user, registerId, availableRegisters, participants = {}, personalRegisterId = '') => {
    return async dispatch => {

        let newAvailableRegisters = JSON.parse(JSON.stringify(availableRegisters))
        delete newAvailableRegisters[registerId]

        set(ref(db, `users/${user.id}/availableMoneyRegisters`), newAvailableRegisters);

        dispatch({
            type: LEAVE_MONEY_REGISTER,
            payload: { newAvailableRegisters }
        })

        if (personalRegisterId.length) {
            let newParticipants = JSON.parse(JSON.stringify(participants))
            const partIndex = Object.values(newParticipants).findIndex(part => part.email.includes(user.email))
            delete newParticipants[Object.keys(newParticipants)[partIndex]]

            set(ref(db, `moneyRegisters/${registerId}/participants`), newParticipants);

            dispatch(getMoneyRegister(personalRegisterId))
        }

    }
}

export const deleteMoneyRegister = (registerId, register, availableRegisters, personalRegisterId, user) => {
    return async dispatch => {

        // Borrar todas las notificaciones pendientes relacionadas al registro
        onValue(ref(db, 'moneyNotifications'), (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const notification = childSnapshot.val();
                    if (!notification.moneyRegister.id.localeCompare(registerId) &&
                        !!notification.type.localeCompare("Money Register Deletion")) {
                        remove(ref(db, `moneyNotifications/${childSnapshot.key}`));
                    }
                });
            }
        }, {
            onlyOnce: true
        });

        // Borrar MoneyRegister
        remove(ref(db, `moneyRegisters/${registerId}`));

        // Enviar notificacion a participantes para que quiten el 
        // registro de availableMoneyRegisters
        for (let participant of Object.values(register.participants)) {
            if (!participant.email.includes(user.email)) {
                const newNotification = {
                    type: "Money Register Deletion",
                    moneyRegister: {
                        id: registerId,
                        name: register.name,
                    },
                    sendToEmail: participant.email,
                    from: {
                        name: user.name,
                        email: user.email,
                    }
                }

                set(push(ref(db, `moneyNotifications`)), newNotification);
            }
        }

        // Actualizar mis availableRegisters
        let newAvailableRegisters = JSON.parse(JSON.stringify(availableRegisters))
        delete newAvailableRegisters[registerId]
        set(ref(db, `users/${user.id}/availableMoneyRegisters`), newAvailableRegisters);

        dispatch(getMoneyRegister(personalRegisterId))

        dispatch({
            type: LEAVE_MONEY_REGISTER,
            payload: { newAvailableRegisters }
        })
    }
}

export const getBanks = (registerId) => {
    return async dispatch => {

        get(child(ref(db), `moneyRegisters/${registerId}/banks`)).then((snapshot) => {
            if (snapshot.exists()) {
                const banks = snapshot.val()
                dispatch(setBanks(banks))
            } else {
                console.log("No data available");

                set(ref(db, `moneyRegisters/${registerId}/banks`), { ...BANKS_DEFAULT })
                dispatch(setBanks(BANKS_DEFAULT))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const addBank = (registerId, bankInfo) => {
    return async dispatch => {

        set(ref(db, `moneyRegisters/${registerId}/banks/${bankInfo.name}`), bankInfo);

        dispatch({
            type: ADD_BANK,
            payload: { bankInfo }
        })
    }
}

export const addAccount = (registerId, bankName, newAccount) => {
    return async dispatch => {

        set(ref(db, `moneyRegisters/${registerId}/banks/${bankName}/accounts/${newAccount.currency}`), newAccount);

        dispatch({
            type: ADD_ACCOUNT,
            payload: { bankName, newAccount }
        })
    }
}

export const updateAccount = (registerId, bankName, currency, key, newValue) => {
    return async dispatch => {

        set(ref(db, `moneyRegisters/${registerId}/banks/${bankName}/accounts/${currency}/${key}`), newValue);

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: { bankName, currency, key, newValue }
        })
    }
}

export const deleteBank = (registerId, bankName) => {
    return async dispatch => {
        remove(ref(db, `moneyRegisters/${registerId}/banks/${bankName}`));

        dispatch({
            type: DELETE_BANK,
            payload: { bankName }
        })
    }
}

export const deleteAccount = (registerId, bankName, accountName) => {
    return async dispatch => {
        remove(ref(db, `moneyRegisters/${registerId}/banks/${bankName}/accounts/${accountName}`));

        dispatch({
            type: DELETE_ACCOUNT,
            payload: { bankName, accountName }
        })
    }
}

export const getOperations = (registerId) => {
    return async dispatch => {

        get(child(ref(db), `moneyRegisters/${registerId}/operations`)).then((snapshot) => {
            if (snapshot.exists()) {
                const operations = snapshot.val()
                dispatch(setOperations(operations))
            } else {
                console.log("No data available");

                set(ref(db, `moneyRegisters/${registerId}/operations`), { ...OPERATIONS_DEFAULT })
                dispatch(setOperations({ ...OPERATIONS_DEFAULT }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const addOperation = (registerId, operationInfo) => {
    return async dispatch => {

        let operationInfoFinal = JSON.parse(JSON.stringify(operationInfo))

        if (operationInfoFinal.photo?.length) {

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

        set(ref(db, `moneyRegisters/${registerId}/operations/${operationInfo.creationDate}`), operationInfoFinal);

        dispatch({
            type: ADD_OPERATION,
            payload: { operationInfo: operationInfoFinal }
        })
    }
}

export const updateOperation = (registerId, operationId, key, newValue) => {
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

        set(ref(db, `moneyRegisters/${registerId}/operations/${operationId}/${key}`), newValueFinal);

        dispatch({
            type: UPDATE_OPERATION,
            payload: { operationId, key, newValue: newValueFinal }
        })
    }
}

export const deleteOperation = (registerId, operationId) => {
    return async dispatch => {
        remove(ref(db, `moneyRegisters/${registerId}/operations/${operationId}`));

        dispatch({
            type: DELETE_OPERATION,
            payload: { operationId }
        })
    }
}
