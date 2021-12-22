import { LOAD_AUTH, LOGIN, LOGOUT } from "../actions/user.action"

const initialState = {
    isAuth: false,
    id: '',
    name: '',
    email: '',
    photoUrl: '',
}

const UserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_AUTH:
            return { ...payload.userInfo }
        case LOGIN:
            return { isAuth: true, ...payload.userInfo }
        case LOGOUT:
            return { isAuth: false, id: '', name: '', email: '', photoUrl: '' }
        default:
            return state
    }
}

export default UserReducer