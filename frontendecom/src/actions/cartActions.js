import { addToCartFromServer, getCartFromServer } from '../services/Cartservice';

export const addToCart = (userId,product) =>
{
    return async (dispatch) =>
    {
        dispatch({ 
            type: 'ADD_TO_CART'
        })
        // const response = await fetch('http://localhost:5000/api/carts/addToCart/6857a2ef69474cac8cf739a6');
        try{
        const response = await addToCartFromServer(userId,product);
        console.log("response-->", response);
        dispatch({ 
            type: 'ADD_TO_CART_SUCCESS', 
            payload: response.cart.items
        })
        }
        catch(error)
        {
            dispatch({ 
                type: 'ADD_TO_CART_FAILURE', 
                payload: error.message
            })
        }
    }
    // return{
    //     type: "ADD_TO_CART",
    //     payload: product
    // }
}

export const removeFromCart = (product) =>
{

    return async (dispatch) =>{
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: product
    })
    }
}

export const increaseQtyAction = (productId) =>
{
    return async (dispatch) =>
    {
        dispatch({
            type: "ADD_TO_CART",
            payload: productId
        })
    }
}


export const decreaseQtyAction = (product) =>
{
    return async (dispatch) =>
    {
        dispatch({
            type: "DECREASE_QTY",
            payload: product
        })
    }
}


export const removeEntireItemFromCartAction = (product) =>
{
    return async(dispatch) =>
    {
        dispatch({
            type: "REMOVE_ENTIRE_ITEM_FROM_CART",
            payload: product
        })
    }
}
// export const increase = () => {
//     return async (dispatch) => {
//         dispatch({
//                 type: "ALL_ORDERS"
//             });
//         try {
//             const allOrdersdata = await getAllOrders();
//             console.log("All orders fetched successfully:", allOrdersdata);
//             dispatch({
//                 type: "GET_ORDERS_SUCCESS",
//                 payload: allOrdersdata
//             });
//         } catch (error) {
//             console.error("Error fetching all orders:", error);
//             dispatch({
//                 type: "GET_ORDERS_FAILURE",
//                 payload: error
//             });
//             throw new Error("Failed to fetch all orders: " + error);
//         }
//     };
// }

export const getAllCart = (userId) =>
{
    return async(dispatch) => {

        dispatch({
            type: "GET_CART"
        })

        try{
            const response = await getCartFromServer(userId);
            console.log("getallcart response action-->", response);
            dispatch({ 
                type: 'GET_CART_SUCCESS', 
                payload: response.carts
            })
        }
        catch(error)
        {
            console.log("getallcart response action-->", error);
            dispatch({ 
                type: 'GET_CART_FAILURE', 
                payload: error.message
            })
        }
    }
}