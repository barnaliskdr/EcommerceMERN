import { completeUserTaskFromBackend } from "../services/WorkflowService";

// Action to complete a human task in the workflow
export const completeHumanTask = (processInstanceId,signal) => {
    console.log("processInstanceId in completeHumanTask", processInstanceId);
    console.log("signal in completeHumanTask", signal);
    return async (dispatch) => {
        dispatch({ type: "TASK_COMPLETION_REQUEST" });
        try {
            
            // Call your backend API to complete the human task
            const response = await completeUserTaskFromBackend(processInstanceId,signal);
            console.log("Task completed successfully:", response);
           
            dispatch({
                type: "TASK_COMPLETION_SUCCESS",
                payload: response,
            });
            // Optionally, fetch all orders again if needed
            // dispatch(getAllOrdersAction());
            return response;
        } catch (error) {
            dispatch({
                type: "TASK_COMPLETION_FAILURE",
                payload: error.response ? error.response.data : error.message,
            });
            throw error;
        }
    };
};