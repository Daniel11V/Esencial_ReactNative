import { LOGIN, LOGOUT } from "../actions/user.action"

const initialState = {
    isAuth: false,
    id: '',
    name: '',
    email: '',
    photoUrl: '',
    accessToken: '',
    moneyRegisters: {}
}

const UserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return { ...state, isAuth: true, ...payload.userInfo }
        case LOGOUT:
            return { ...initialState }
        default:
            return state
    }
}

export default UserReducer