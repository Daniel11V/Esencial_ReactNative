import {
    END_LOADING,
    SET_MONEY_REGISTERS_ID, SET_MONEY_REGISTER, SET_MONEY_PERS_REGISTER_ID, CREATE_MONEY_REGISTER,
    ADD_BANK, SET_BANKS, DELETE_BANK,
    ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT,
    ADD_OPERATION, DELETE_OPERATION, SET_OPERATIONS, UPDATE_OPERATION, SET_MONEY_NOTIFICATIONS, DELETE_MONEY_NOTIFICATION, ADD_MONEY_REGISTER,
} from "../actions/money.action"

const initialState = {
    availableRegisters: {},
    currentRegisterId: '',   // UNIQUE FIREBASE ID
    personalRegisterId: '',  // UNIQUE FIREBASE ID
    currentRegister: {
        name: '',
        banks: {},
        operations: {},
        participants: {
            initial: {
                email: '',
                name: '',
                photoUrl: '',
                accessLevel: 1,
            },
        }
    },
    notifications: {},
    loadingFirstView: true,
}

const MoneyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case END_LOADING:
            return { ...state, loadingFirstView: payload.loadingState }
        case CREATE_MONEY_REGISTER:
            if (payload.isPersonalRegister) {
                return {
                    ...state,
                    currentRegisterId: payload.newRegisterId,
                    currentRegister: payload.newRegister,
                    personalRegisterId: payload.newRegisterId,
                }
            } else {
                return {
                    ...state,
                    currentRegisterId: payload.newRegisterId,
                    currentRegister: payload.newRegister,
                    availableRegisters: {
                        [payload.newRegisterId]: {
                            id: payload.newRegisterId,
                            name: payload.newRegister.name
                        }
                    },
                }
            }
        case SET_MONEY_REGISTERS_ID:
            return {
                ...state,
                availableRegisters: { ...payload.moneyRegistersId },
            }
        case SET_MONEY_PERS_REGISTER_ID:
            return {
                ...state,
                personalRegisterId: payload.personalMoneyRegisterId,
            }
        case SET_MONEY_REGISTER:
            return {
                ...state,
                currentRegisterId: payload.registerId,
                currentRegister: { ...payload.moneyRegister },
            }
        case ADD_MONEY_REGISTER:
            return {
                ...state,
                availableRegisters: {
                    ...state.availableRegisters,
                    [payload.newMoneyRegister.id]: { ...payload.newMoneyRegister }
                },
            }
        case SET_MONEY_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload.updatedNotifications,
            }
        case DELETE_MONEY_NOTIFICATION:
            let deleteNotificationState = JSON.parse(JSON.stringify(state.notifications))
            delete deleteNotificationState[payload.notificationId]
            return {
                ...state,
                notifications: { ...deleteNotificationState }
            }
        case SET_BANKS:
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    banks: { ...payload.banksUpdated }
                }
            }
        case ADD_BANK:
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    banks: { ...state.currentRegister.banks, [payload.bankInfo.name]: payload.bankInfo }
                }
            }
        case ADD_ACCOUNT:
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    banks: {
                        ...state.currentRegister.banks,
                        [payload.bankName]: {
                            ...state.currentRegister.banks[payload.bankName],
                            accounts: {
                                ...state.currentRegister.banks[payload.bankName].accounts,
                                [payload.newAccount.currency]: payload.newAccount
                            }
                        }
                    }
                }
            }
        case UPDATE_ACCOUNT:
            let updateAccountState = JSON.parse(JSON.stringify(state.currentRegister.banks))
            updateAccountState[payload.bankName].accounts[payload.currency][payload.key] = payload.newValue
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    banks: { ...updateAccountState }
                }
            }
        case DELETE_BANK:
            let deleteBankState = JSON.parse(JSON.stringify(state.currentRegister.banks))
            delete deleteBankState[payload.bankName]
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    banks: { ...deleteBankState }
                }
            }
        case DELETE_ACCOUNT:
            let deleteAccountState = JSON.parse(JSON.stringify(state.currentRegister.banks))
            delete deleteAccountState[payload.bankName].accounts[payload.accountName]
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    banks: { ...deleteAccountState }
                }
            }

        // Operations
        case SET_OPERATIONS:
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    operations: { ...payload.operationsUpdated }
                }
            }
        case ADD_OPERATION:
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    operations: {
                        ...state.currentRegister.operations,
                        [payload.operationInfo.creationDate]: payload.operationInfo
                    }
                }
            }
        case UPDATE_OPERATION:
            let updateOperationState = JSON.parse(JSON.stringify(state.currentRegister.operations))
            updateOperationState[payload.operationId][payload.key] = payload.newValue
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    operations: { ...updateOperationState }
                }
            }
        case DELETE_OPERATION:
            let deleteOperationState = JSON.parse(JSON.stringify(state.currentRegister.operations))
            delete deleteOperationState[payload.operationId]
            return {
                ...state,
                currentRegister: {
                    ...state.currentRegister,
                    operations: { ...deleteOperationState }
                }
            }
        default:
            return state
    }
}

export default MoneyReducer