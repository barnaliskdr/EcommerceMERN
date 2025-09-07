const initialState = {
    orders: [],
    error: null,
    loading: false
};


export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_ORDERS":
            return {
                ...state,
                loading: true
            };
        case "GET_ORDERS_SUCCESS":
            console.log("orders fetch successful:", action.payload);
            return {
                ...state,
               orders: action.payload
            };
        case "GET_ORDERS_FAILURE":
            return {
                ...state,
                error: action.payload
            };
        case "GET_USER_ORDERS_SUCCESS":
            return{
                ...state,
                orders: action.payload
            };
        case "GET_USER_ORDERS_FAILURE":
            return{
                ...state,
                error: action.payload,
            };
        case "USER_ORDERS":
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
};