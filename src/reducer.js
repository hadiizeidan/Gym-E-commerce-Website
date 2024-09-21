export const initialState = {
    user : null, 
    basket : []
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER' : 
            return {
                ...state,
                user : action.user
            }
        case 'ADD_TO_BASKET' : 
            return {
                ...state,
                basket : [...state.basket, action.item]
            }
        default : 
            return state;
    }
}