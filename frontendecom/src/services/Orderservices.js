export const placeOrder = async(orderItems, orderTotal,userId, deliveryAddress, paymentMethod, tax, shippingcharge) => {
   try{
        const response = await fetch("http://localhost:5000/api/orders/placeorder",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            user: userId, // This should be dynamically set based on the logged-in user
            // orderItems: [
            //     {
            //     "product": "6857a2ef69474cac8cf739a4",
            //     "name": "Organic Apples",
            //     "qty": 3,
            //     "price": 12
            //     },
            //     {
            //     "product": "6857a2ef69474cac8cf739a9",
            //     "name": "Spinach",
            //     "qty": 2,
            //     "price": 12.5
            //     },
            //     {
            //     "product": "6857a2ef69474cac8cf739ab",
            //     "name": "Organic Eggs",
            //     "qty": 2,
            //     "price": 9
            //     }
            // ],
            orderItems: orderItems,
            orderTotal: orderTotal,
            "isPaid": true,
            "paidAt": "Tuesday, June 15, 2025",
            // "DeliveryAddress": {
            //     "address": "123 MG Road",
            //     "city": "Mumbai",
            //     "zipCode": "400001",
            //     "country": "India",
            //     "phone": "9876543210"
            // },
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