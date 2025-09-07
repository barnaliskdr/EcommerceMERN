import { getAllWishListFromServer, AddToWishListFromServer, removeFromWishListServer } from '../services/WishlistService';

export const getAllWishList = (userId) =>
{
    console.log("In Action userId:", userId);
    return async (dispatch) =>
    {
        dispatch({
                type: "WISHLIST_FETCH" 
            });
        try{
             const response = await getAllWishListFromServer(userId);
             console.log("wishlist response from server: ", response.wishlist.wishlist);
             const wishListDetails = await response.wishlist;
             console.log("Fetched wishlist IDs from server:", wishListDetails);
            dispatch({
                type: "WISHLIST_FETCH_SUCCESS",
                payload: response.wishlist.wishlist   // 👈 only the array of products
            });
        }
        catch(error)
        {
            dispatch({
                type: "WISHLIST_FETCH_FAILURE",
                payload: error.message
            })

        }
    }
}


export const addToWishList = (productId,userId) =>
{
    console.log("In Action product:", productId);
    return async (dispatch) =>
    {
        dispatch({
                    type: "ADD_TO_WISHLIST"
                });
        try{
               
                const response = await AddToWishListFromServer(productId,userId);
                console.log("response from add to wishlist:",response);
                dispatch({
                    type: "ADD_TO_WISHLIST_SUCCESS",
                    payload: response.wishlist
                });
        }
        catch(error)
        {
                dispatch({
                    type: "ADD_TO_WISHLIST_FAILURE",
                    payload: error.message
                });
                console.error("Error adding to wishlist:", error);
        }
    }
}



export const removeFromWishList = (productId,userId) =>
{
    console.log("In Action product:", productId);
    return async (dispatch) =>
    {
        dispatch({
                    type: "REMOVE_FROM_WISHLIST"
                });
        try{
                const response = await removeFromWishListServer(productId,userId);
                dispatch({
                    type: "REMOVE_FROM_WISHLIST_SUCCESS",
                    payload: response.wishlist
                });
        }
        catch(error)
        {
                dispatch({
                    type: "REMOVE_FROM_WISHLIST_FAILURE",
                    payload: error.message
                });
                console.error("Error adding to wishlist:", error);
        }
    }
}