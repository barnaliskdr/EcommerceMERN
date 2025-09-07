import express from "express";
// import ProductController from "../controllers/ProductController.js";
//import products from '../data/products.js';
import Product from "../model/productModel.js";
import { createCart, addToCart, removeFromCart,getCartByUserId, changeCartStatus } from "../controller/cartController.js";



const router = express.Router();



router.post("/create",express.json(),createCart);
router.post("/addtocart", express.json(), addToCart);
router.delete("/removeFromCart/:productId", express.json(), removeFromCart);
router.get("/getcart/:userId",express.json(),getCartByUserId);
router.put("/changestatus", express.json(), changeCartStatus);
// router.get("/deletecart",deleteCart);
// router.post("/getAllWishlistItems", express.json(), getAllFromWishlist);



export default router;






