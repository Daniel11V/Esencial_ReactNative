
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (userInfo) => ({
    type: LOGIN,
    payload: { userInfo }
})

export const logout = () => ({
    type: LOGOUT,
    payload: {}
})
