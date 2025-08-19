const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
};

const workflowReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TASK_COMPLETION_REQUEST":
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case "TASK_COMPLETION_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload,
                error: null,
            };
        case "TASK_COMPLETION_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default workflowReducer;