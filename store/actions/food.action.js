export const END_LOADING = 'END_LOADING'

export const SET_FAVORITE = 'SET_FAVORITE'

export const setFavorite = (recipeId, toFavorite) => ({
    type: SET_FAVORITE,
    payload: { recipeId, toFavorite }
})

export const setFavoriteDB = (recipeId, toFavorite) => {
    return async dispatch => {

        // set(ref(db, `moneyRegisters/${registerId}/banks/${bankName}/accounts/${newAccount.currency}`), newAccount);
        
        dispatch({
            type: SET_FAVORITE,
            payload: { recipeId, toFavorite }
        })
    }
}