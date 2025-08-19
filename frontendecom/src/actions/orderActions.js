import { placeOrder, getAllOrders } from "../services/Orderservices";
import { toast } from "react-toastify";


export const placeOrderAction = (orderItems, orderTotal, userId, deliveryAddress, paymentMethod, tax, shippingcharge,navigate,setShowToast) => {

        console.log("action called with:",deliveryAddress);
        return async (dispatch) => {
            // dispatch({
            //     type: "LOGIN"
            // });
            try{
                const responseData = await placeOrder(orderItems, orderTotal, userId, deliveryAddress, paymentMethod, tax, shippingcharge,navigate);
                console.log("Order placed successfully:", responseData);   
                // {
                    //     "message": "Login successful",
                    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvb2phQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUG9vamEgR29tZXMiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NDk5ODUyMTQsImV4cCI6MTc1MDA3MTYxNH0.F35iQo9Bb3DcDn_oNU1VehHZZcBpqhyBZlKbm3PkLmg",
                    //     "user": {
                    //         "id": "684e788c6747ce7408b14245",
                    //         "name": "Pooja Gomes"
                    //     }
                    // }
                // dispatch({
                // type: "ORDER_SUCCESS",
                // payload: {
                //     name: responseData.user.name,
                //     email: responseData.user.email,
                //     role: responseData.user.role,
                //     token: responseData.token
                // }
                // });
                if (responseData && responseData.processInstanceId) {
                    console.log("Process instance started successfully with ID:", responseData.processInstanceId);
                setShowToast(true); // Show toast notification on successful order placement
                toast.success("Order placed successfully!"); 
                //     {
                //     position: "center",
                //     autoClose: 3000, // Auto close after 3 seconds
                // });
                navigate("/profile"); // Navigate to the orders page after successful order placement
                return responseData; // Return the response data for further processing if needed
            }
    else
        {
            setShowToast(true);
            // console.error("Order placement failed:", responseData);
            toast.error("Order placement failed. Please try again."); 
            // {
            //     position: "center",
            //     autoClose: 3000, // Auto close after 3 seconds
            // });
            // throw new Error("Order placement failed");
        }
        
        }
        catch(error) {
            console.error("Login failed:", error);
            throw new Error("Order placement failed: " + error.message);
            // dispatch({
            //     type: "LOGIN_FAILURE",
            //     payload: error.message
            // });
        }
    }
}

export const getAllOrdersAction = () => {
    return async (dispatch) => {
        dispatch({
                type: "ALL_ORDERS"
            });
        try {
            const allOrdersdata = await getAllOrders();
            console.log("All orders fetched successfully:", allOrdersdata);
            dispatch({
                type: "GET_ORDERS_SUCCESS",
                payload: allOrdersdata
            });
        } catch (error) {
            console.error("Error fetching all orders:", error);
            dispatch({
                type: "GET_ORDERS_FAILURE",
                payload: error
            });
            throw new Error("Failed to fetch all orders: " + error);
        }
    };
}


// export const completeHumanTask = (processInstanceId) => { 
//     // try{
//     //     const taskIdTocomplete = fetchTasks(processInstanceId);

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