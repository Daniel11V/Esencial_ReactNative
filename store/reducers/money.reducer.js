import { ADD_ACCOUNT, ADD_BANK, DELETE_ACCOUNT, DELETE_BANK, END_LOADING, SET_BANKS, UPDATE_ACCOUNT, ADD_OPERATION, DELETE_OPERATION, SET_OPERATIONS } from "../actions/money.action"

const initialState = {
    banks: {},
    operations: {},
    loadingFirstView: true
}

const MoneyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case END_LOADING:
            return { ...state, loadingFirstView: payload.loadingState }
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

        // Operations
        case SET_OPERATIONS:
            return { ...state, operations: { ...payload.operationsUpdated } }
        case ADD_OPERATION:
            return { ...state, operations: { ...state.operations, [payload.operationInfo.creationDate]: payload.operationInfo } }
        case DELETE_OPERATION:
            let deleteOperationState = JSON.parse(JSON.stringify(state.operations))
            delete deleteOperationState[payload.operationId]
            return {
                ...state, operations: { ...deleteOperationState }
            }
        default:
            return state
    }
}

export default MoneyReducer