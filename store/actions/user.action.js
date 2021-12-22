
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOAD_AUTH = 'LOAD_AUTH'

export const login = (userInfo) => ({
    type: LOGIN,
    payload: { userInfo }
})

export const logout = () => ({
    type: LOGOUT,
    payload: {}
})

export const loadAuth = () => {
    return async dispatch => {

        // set(ref(db, `users/1234/banks/${bankInfo.name}`), bankInfo);
        const userInfo = { isAuth: false, id: '', name: '', email: '', photoUrl: '' }

        dispatch({
            type: LOAD_AUTH,
            payload: { userInfo }
        })
    }
}
