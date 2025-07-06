import express from "express";
import axios from "axios";
import Order from "../model/orderModel.js";

export const placeOrder = async (req, res) => {
  //POST:   /api/orders/placeorder
  // const { userId, cart, orderTotal } = req.body;
  console.log("Request body:", req.body.orderItems);
  // if (!userId || !cart || !orderTotal ) {

  //   console.error("Invalid order data:", req.body);
  //   return res.status(400).json({ message: "Invalid order data" });
  // }

  try {
    // Save the order to MongoDB
    const newOrder = new Order({
      user: req.body.user,
      orderItems: req.body.orderItems,
      total: req.body.orderTotal,
      DeliveryAddress: req.body.DeliveryAddress,
      itemPrice: req.body.itemPrice,
      paymentMethod: req.body.paymentMethod,
      tax: req.body.tax,
      shippingCharge: req.body.shippingCharge
    });
    await newOrder.save();

    // 2. Start Camunda process
    const response = await axios.post("http://localhost:8080/engine-rest/process-definition/key/Process_1biqo1h/start", {
    variables: 
      {
        orderId: { value: newOrder._id.toString(), type: "String" },
        userId: { value: newOrder.user.toString(), type: "String" },
        orderItems: {
          value: JSON.stringify(req.body.orderItems),
          type: "Json",
          valueInfo: {
            serializationDataFormat: "application/json"
          }
        }
        // Add more variables as needed
      },
      
      //http://localhost:8080/engine-rest/process-definition/key/Process_1biqo1h/start
      //This API call starts a new Camunda process instance (with key Process_1biqo1h) and passes the variables (orderId, userId, etc.) into the process.
      // Inside your BPMN process, you likely have a Service Task (or External Task) with a topic (e.g., "place-order").
      // Your Camunda worker (the Node.js worker you wrote) is subscribed to this topic (client.subscribe("place-order", ...)).
      // When the process instance reaches that task, Camunda sends the task and variables to your worker.
      // Your worker receives the variables (like orderId, userId), does its job (e.g., calls another API, updates DB), and then completes the task.
  });
   console.log("Order placed successfully:");
    return res.status(201).json({ orderId: newOrder._id ,order: newOrder,processInstanceId: response.data.id, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Server error while placing order" });
  }
}


export const getAllOrdersByuserId = async (req, res) => {
  // GET loggedin user's order: /api/orders/user/:userid

  console.log("userid param:", req.params.userid); 

  try{
    const  userId = req.params.userid;

    if (userId  === undefined || userId === null) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    // Fetch orders for the given user ID
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json(orders);
  }
  catch (error) {
    console.error("Error fetching orders by user ID:", error);
    return res.status(500).json({ message: "Server error while fetching orders" });
  }
 
}


export const getAllOrdersByDate = async (req, res) => {
  // GET all orders: /api/orders/:date
}


export const getAllOrdersByOrderId = async (req, res) => {
  // GET order by id: /api/orders/order/:id
  // const { id } = req.params;

  // if (!id) {
  //   return res.status(400).json({ message: "Invalid order ID" });
  // }
  const id = req.params.orderid;
  try{
    const order = await Order.find({ id: req.params.id });
    // console.log("Order fetched by ID:", order);
    if(!order)
    {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order); 
  }
  catch(error)
  {
    return res.status(500).json({ message: "Something went wrong"});
  }
}


export const updateOrderToPaid = async (req, res) => {
  // PUT: /api/orders/admin/:id (status update)

  // try{
  //   await Order.findByIdAndUpdate(req.params.id, 
  //     { isPaid: true, paidAt: Date.now(), paymentResult: {
  //       id: req.body.id,  

  // }
 
}


export const updateOrderToDelivered = async (req, res) => {
  // PUT: /api/orders/customer/:id (status update)
  console.log("Updating order to delivered with ID:", req.params.orderId);
  const  id  = req.params.orderId;
  if (!id) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try{
    const order = await Order.findOneAndUpdate({_id: id}, { isDelivered:true, deliveredAt: Date.now(), orderStatus: "Delivered" }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order delivered successfully", order });
  }
  catch(error) {
    console.error("Error updating order to delivered:", error);
    return res.status(500).json({ message:"Server Error while updating order to delivered" });
  }
}

export const deleteOrder = async (req, res) => {
  // DELETE: /api/orders/manager/:id
  // const { id } = req.params;

  // if (!id) {
  //   return res.status(400).json({ message: "Invalid order ID" });
  // }

  // try {
  //   const order = await Order.findByIdAndDelete(id);
  //   if (!order) {
  //     return res.status(404).json({ message: "Order not found" });
  //   }
  //   return res.status(200).json({ message: "Order deleted successfully" });
  // } catch (error) {
  //   console.error("Error deleting order:", error);
  //   return res.status(500).json({ message: "Server error while deleting order" });
  // }
}


export const updateOrderToTransit = async (req, res) => {  
  // PUT: /api/orders/manager/:id (status update)
  // const { id } = req.params;

  // if (!id) {
  //   return res.status(400).json({ message: "Invalid order ID" });
  // }

  // try {
  //   const order = await Order.findByIdAndUpdate(id, { onTransit: true }, { new: true });
  //   if (!order) {
  //     return res.status(404).json({ message: "Order not found" });
  //   }
  //   return res.status(200).json(order);
  // } catch (error) {
  //   console.error("Error updating order to transit:", error);
  //   return res.status(500).json({ message: "Server error while updating order to transit" });
  // }
}


export const updateOrderStatus = async (req, res) => {
  try{
  const order = await Order.findByIdAndUpdate(req.params.id,
    { $set: req.body},
    { new: true, runValidators: true }
  );
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  }
  catch(error)
  {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error while updating order status" });
  }
}