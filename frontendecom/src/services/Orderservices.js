export const placeOrder = async(orderItems, orderTotal,userId, deliveryAddress, paymentMethod, tax, shippingcharge) => {
   console.log("Placing order with items:", orderItems);
    try{
        const response = await fetch("http://localhost:5000/api/orders/placeorder",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            user: userId, // This should be dynamically set based on the logged-in user
            orderItems: orderItems,
            orderTotal: orderTotal,
            isPaid: true,
            paidAt: "Tuesday, June 15, 2025",
            DeliveryAddress: deliveryAddress,
            paymentMethod: paymentMethod,
            tax: tax,
            shippingCharge: shippingcharge,
            orderStatus: "pending",
            deliveredAt: null,
            paymentResult: {
                    id: null,
                    status: "pending",
                    update_time: "23:31:18.345",
                    email_address: "riya@gmail.com"
                }
        }
        )
        });
        console.log("response-->", response);
        return await response.json();
   }
   catch(error) {
       console.error("Order placement failed:", error);
       throw new Error("Order placement failed");
   }
}



// export const completeHumanTask = async (processInstanceId) => {
//     try{
//         const response = await fetch("http://localhost:8080/engine-rest/task/7049c518-583c-11f0-b454-28c5c83ea0c7/complete")
//     }
//     catch(error)
//     {
//         console.error("Error completing human task:", error);
//         throw new Error("Failed to complete human task");
//     }
// }


export const getAllOrders = async() => {
    try{
        const response = await fetch("http://localhost:5000/api/orders/allorders");
        console.log("response-->", response);
        return response.json();
    }
    catch(error)
    {
        console.error("Error fetching all orders:", error);
        throw new Error("Failed to fetch all orders: " + error);
    }
}


export const getOrdersByUserFromService = async(userId) => {
    try{
            const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
            console.log("response-->", response);
            return response.json();
    }
    catch(error)
    {
        console.error("Error fetching user orders:", error);
        throw new Error("Failed to fetch user orders: " + error);
    }   
}