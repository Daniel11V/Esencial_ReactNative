import { ADD_ACCOUNT, ADD_BANK, DELETE_ACCOUNT, DELETE_BANK, SET_BANKS, UPDATE_ACCOUNT } from "../actions/bank.action"
import { ADD_OPERATION, DELETE_OPERATION, SET_OPERATIONS, UPDATE_OPERATION } from "../actions/operation.action"


const initialState = {
    banks: {},
    operations: {},
    loading: true
}

const MoneyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BANKS:
            return { ...state, banks: { ...payload.banksUpdated } }
        case ADD_BANK:
            return { ...state, banks: { ...state.banks, [payload.bankInfo.name]: payload.bankInfo } }
        case ADD_ACCOUNT:
            return {
                ...state,
                banks: {
                    ...state.banks,
                    [payload.bankName]: {
                        ...state.banks[payload.bankName],
                        accounts: {
                            ...state.banks[payload.bankName].accounts,
                            [payload.newAccount.currency]: payload.newAccount
                        }
                    }
                }
            }
        case UPDATE_ACCOUNT:
            let updateAccountState = JSON.parse(JSON.stringify(state.banks))
            updateAccountState[payload.bankName].accounts[payload.currency][payload.key] = payload.newValue
            return { ...state, banks: { ...updateAccountState } }
        case DELETE_BANK:
            let deleteBankState = JSON.parse(JSON.stringify(state.banks))
            delete deleteBankState[payload.bankName]
            return {
                ...state, banks: { ...deleteBankState }
            }
        case DELETE_ACCOUNT:
            let deleteAccountState = JSON.parse(JSON.stringify(state.banks))
            delete deleteAccountState[payload.bankName].accounts[payload.accountName]
            return {
                ...state, banks: { ...deleteAccountState }
            }
        case SET_OPERATIONS:
            return { ...state, operations: { ...payload.operationsUpdated } }
        case ADD_OPERATION:
            return { ...state, operations: { ...state.operations, [payload.operationInfo.name]: payload.operationInfo } }
        case UPDATE_OPERATION:
            let updateOperationState = JSON.parse(JSON.stringify(state.operations))
            updateOperationState[payload.operationName].accounts[payload.currency][payload.key] = payload.newValue
            return { ...state, operations: { ...updateOperationState } }
        case DELETE_OPERATION:
            let deleteOperationState = JSON.parse(JSON.stringify(state.operations))
            delete deleteOperationState[payload.operationName]
            return {
                ...state, operations: { ...deleteOperationState }
            }
        default:
            return state
    }
}

export default MoneyReducer