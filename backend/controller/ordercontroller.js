import express from "express";
import axios from "axios";
import Order from "../model/orderModel.js";
import { fetchAndLockWorkflow,completeWorkflowTask, completeUserTask, getExternalTaskByProcessInstanceId } from "../workFlowworkers/workflowApis.js";
import { io } from "../server.js";

export const placeOrder = async (req, res) => {
  //POST:   /api/orders/placeorder
  // const { userId, cart, orderTotal } = req.body;

  
  console.log("Request body:", req.body.orderItems);
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
          // processInstanceid: response.data., // Store the process instance ID
        });
   
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
    });

    // Store processInstanceId in the order before saving
   newOrder.processInstanceId = response.data.id;

   await newOrder.save();
   const taskId = completeServiceTask("place-order", response.processInstanceId);
   console.log("Order placed successfully:");

   io.emit("newOrder", newOrder);
   return res.status(201).json({ orderId: newOrder._id ,order: newOrder,processInstanceId: response.data.id,taskid: taskId, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Server error while placing order" });
    // throw new Error("Order placement failed: " + error.message);
  }
}


export const updateStatusToDB = async (req,res) => {

    const { taskTopic } = req.params;
    const { processInstanceId } = req.params;
    const orderStatus = req.body.orderStatus;
    const orderId = req.body.orderId; 
    console.log("orderStatus:", orderStatus);
    console.log("new orderId:", orderId);
    console.log("Updating status to DB for task topic:", taskTopic);
    try
    {
      const resp = await completeServiceTask(taskTopic, processInstanceId);

      const updateorderResp = fetch(`http://localhost:5000/api/orders/updateorderStatus/${orderId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderStatus: orderStatus })
      })
      // const updateorderData = await updateorderResp.json();
      console.log("Status updated successfully:", updateorderResp);
      console.log("Response from update order status:", resp);
      return res.status(200).json({ message: "Status updated successfully"});
    }
    catch(error)
    {
        console.error("Error updating status to DB:", error);
        return res.status(500).json({ message: "Server error while updating status" });
    }
}


export const completeServiceTask = async (tasktopic, taskId) => {
  //fetch external taskId  of the process instance
  //fetchandLocak
  //hit complete api
  let variables;
  if(tasktopic == "place-order")
  {
    variables = {
        "workerId": "place-order-worker"
    }
  }
  if(tasktopic == "update-status-to-shipped")
  {
    variables = {
      "workerId": "update-status-to-shipped"
    }
  }
  if(tasktopic == "update-status-to-out-for-delivery")
  {
    variables = {
      "workerId": "update-status-to-out-for-delivery"
    }
  }
  if(tasktopic == "update-status-to-delivered")
  {
    variables = {
      "workerId": "update-status-to-delivered"
    }
  }
  try{
    console.log("Fetching and locking workflow task for topic:", tasktopic);
    const taskIdToComplete = await fetchAndLockWorkflow(tasktopic);
    console.log("Task ID to complete:", taskIdToComplete);
    const completeTaskResponse = await completeWorkflowTask(taskIdToComplete, variables);
    console.log("Task completed successfully:", completeTaskResponse);
    // const response = await axios.post(`http://localhost:8080/engine-rest/external-task/${taskIdToComplete}/complete`, {
    //   workerId: "orderWorker",
    //   variables: {
    //     orderId: { value: taskId, type: "String" },
    //     userId: { value: taskId, type: "String" }
    //   }
    // });
    // return taskIdToComplete;
    return completeTaskResponse;
  }
  catch (error) {
    console.error("Error completing service task:", error);
    throw new Error("Failed to complete service task: " + error.message);
  }
}


export const completeHumanTask = async (taskId) => {
  try{
    const response = await completeUserTask(taskId);
    console.log("Human task completed successfully:", response);
    return response;
  }
  catch(error) {
    console.error("Error completing human task:", error);
    throw new Error("Failed to complete human task: " + error.message);
  }
}


export const getOrdersByuserId = async (req, res) => {
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


export const getOrdersByDate = async (req, res) => {
  // GET all orders: /api/orders/:date
}


export const getOrderByOrderId = async (req, res) => {
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

//export const deleteOrder = async (req, res) => {
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
//}


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


// export const updateOrderStatus = async (req, res) => {
//   try{
//   const order = await Order.findByIdAndUpdate(req.params.orderId,
//     { $set: req.body},
//     { new: true, runValidators: true }
//   );
//   if (!order) {
//     return res.status(404).json({ message: "Order not found" });
//   }
//   }
//   catch(error)
//   {
//     console.error("Error updating order status:", error);
//     return res.status(500).json({ message: "Server error while updating order status" });
//   }
// }

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: { orderStatus } },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Send success response
    return res.status(200).json({
      message: "Order status updated successfully",
      updatedOrder: order
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error while updating order status" });
  }
};



export const getAllOrders = async (req, res) => {
  // GET all orders: /api/orders
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ message: "Server error while fetching all orders" });
  }
}


export const deleteOrder = async(req,res)  => {
  try{
    console.log("inside deleteOrder controller");
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const order = await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order deleted successfully"});
  }
  catch(error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ message: "Server error while cancelling order" });
  }
}