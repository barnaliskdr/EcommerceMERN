const initialState = {
    isLoggedIn: false,
    userData: null,
    error: null,
    loading: false
};


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                loading: true
            };
        case "LOGIN_SUCCESS":
            console.log("Login successful:", action.payload);
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                isLoggedIn: false,
                userData: null,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};