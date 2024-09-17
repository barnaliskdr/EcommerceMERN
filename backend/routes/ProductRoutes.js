import express from "express";
// import ProductController from "../controllers/ProductController.js";
//import products from '../data/products.js';
import Product from "../model/productModel.js";
import { getAllProducts, getProductsByName } from "../controller/productcontroller.js";



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




router.get("/",getAllProducts);
router.get("/",getProductsByName);

// router.get("/:id", async(req, res) => {
//     try{
//     const product = await Product.find(p => p.id === req.params.id);
//     if(!product){
//         return res.status(404).json({message: "Product not found"});
//     }
//     else
//     {
//         return res.status(200).json(product);
//     }
//     }
//     catch(error){
//         return res.status(500).json({message: error.message});
//     }
// })

// router.get("/:name", async (req, res) => {
//     try {
//       const nameFilter = req.params.name; // No need for toLowerCase here since $options: 'i' handles case insensitivity
      
//       const products = await Product.find({
//         name: { $regex: nameFilter, $options: 'i' } // Case-insensitive regex match
//       });
  
//       if (products.length > 0) {
//         return res.status(200).json({ data: products, message: "Success" });
//       } else {
//         return res.status(404).json({ data: [],message: "Product not found" });
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: error.message });
//     }
//   });


export default router;

