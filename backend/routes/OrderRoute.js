import express from "express";
// import ProductController from "../controllers/ProductController.js";
//import products from '../data/products.js';
import Product from "../model/productModel.js";
import { placeOrder, getAllOrdersByuserId, getAllOrdersByDate, 
         getOrderById, updateOrderToPaid, updateOrderToDelivered,
        deleteOrder, updateOrderToTransit
 } from "../controller/ordercontroller.js";



const router = express.Router();
// router.get("/", async (req, res) => {
//     // res.json(products);
//     try {
//         const products = await Product.find({}); // Fetch all products from the database
//         res.json(products);
//         console.log("Successfully fetched all productDetails.")
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//       }
// })

router.post("/placeorder",placeOrder);
router.get("/api/orders/:userid",getAllOrdersByuserId);
router.get("/api/orders/:date",getAllOrdersByDate);
router.get("/api/orders/:userid",getOrderById);       
router.put("/ ",updateOrderToPaid);
router.put("/",updateOrderToDelivered);
router.put("/",updateOrderToTransit);
router.delete("/",deleteOrder);

export default router;


