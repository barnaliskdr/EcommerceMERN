import express from "express";
import Order from "../model/orderModel.js";

export const placeOrder = async (req, res) => {
  //POST:   /api/orders/placeorder
  const { userId, cart, orderTotal } = req.body;

  if (!userId || !cart || !orderTotal ) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    // Save the order to MongoDB
    const newOrder = new Order({
      user: req.body.userId,
      orderItems: req.body.cart,
      total: req.body.orderTotal,
      DeliveryAddress: req.body.DeliveryAddress,
      itemPrice: req.body.itemPrice,
      paymentMethod: req.body.paymentMethod,
      tax: req.body.tax,
      shippingCharge: req.body.shippingCharge
    });
    await newOrder.save();
    console.log("Order placed successfully:", { userId, cart, orderTotal });
    return res.status(201).json({ orderId: newOrder._id ,order: newOrder, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Server error while placing order" });
  }
}


export const getAllOrdersByuserId = async (req, res) => {
  // GET loggedin user's order: /api/orders/:userid
 
}


export const getAllOrdersByDate = async (req, res) => {
  // GET all orders: /api/orders/:date
}


export const getOrderById = async (req, res) => {
  // GET order by id: /api/orders/:id
  // const { id } = req.params;

  // if (!id) {
  //   return res.status(400).json({ message: "Invalid order ID" });
  // }

  // try {
  //   const order = await Order.findById(id);
  //   if (!order) {
  //     return res.status(404).json({ message: "Order not found" });
  //   }
  //   return res.status(200).json(order);
  // } catch (error) {
  //   console.error("Error fetching order:", error);
  //   return res.status(500).json({ message: "Server error while fetching order" });
  // }
}


export const updateOrderToPaid = async (req, res) => {
  // PUT: /api/orders/admin/:id (status update)
 
}


export const updateOrderToDelivered = async (req, res) => {
  // PUT: /api/orders/customer/:id (status update)
 
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