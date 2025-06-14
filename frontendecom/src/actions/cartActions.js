export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product) =>
{
    return async (dispatch) =>
    {
        dispatch({ 
            type: ADD_TO_CART, 
            payload: product
        })
    }
    // return{
    //     type: "ADD_TO_CART",
    //     payload: product
    // }
}

export const removeFromCart = (product) =>
{
    // return async (dispatch) =>
    // {
    //     dispatch({ type: REMOVE_FROM_CART, payload: product })
    // }
    return{
        type: "REMOVE_FROM_CART",
        payload: product
    }
}