const initialState ={
    wishListedItems: [],
    error: null,
    loading: false
}


export const wishListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "WISHLIST_FETCH":
            return {
                ...state,
                loading: true
            };
        case "WISHLIST_FETCH_SUCCESS":
            console.log("wishlist fetch successful:", action.payload);
            return {
                ...state,
               wishListedItems: action.payload
            };
        case "WISHLIST_FETCH_FAILURE":
            return {
                ...state,
                error: action.payload
            };
        case "ADD_TO_WISHLIST":
            return{
                ...state,
                loading: true
            }
        case "ADD_TO_WISHLIST_SUCCESS":
             return {
                ...state,
                wishListedItems: action.payload, // directly the array
                loading: false
            };
        case "ADD_TO_WISHLIST_FAILURE":
            return{
                ...state,
                error: action.payload
            }
        case "REMOVE_FROM_WISHLIST":
            return{
                ...state,
                loading: true
            }
        case "REMOVE_FROM_WISHLIST_SUCCESS":
            return{
                ...state,
                wishListedItems: action.payload
            }
        case "REMOVE_FROM_WISHLIST_FAILURE":
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};