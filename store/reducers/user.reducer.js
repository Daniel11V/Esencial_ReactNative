import { LOGIN, LOGOUT } from "../actions/user.action"

const initialState = {
    id: '0',    // Loading
    name: '',
    email: '',
    photoUrl: '',
    accessToken: '',
}

const UserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return { ...state, ...payload.userInfo }
        case LOGOUT:
            return { ...initialState }
        default:
            return state
    }
}

export default UserReducer