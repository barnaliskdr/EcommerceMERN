import express from "express";
// import ProductController from "../controllers/ProductController.js";
//import products from '../data/products.js';
import Product from "../model/productModel.js"
import User from "../model/userModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products from the database
        res.json(products);
        console.log("Successfully fetched all productDetails.")
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
}


export const getProductsByName = async (req, res) => {
        try {
          const nameFilter = req.params.name; // No need for toLowerCase here since $options: 'i' handles case insensitivity
          
          const products = await Product.find({
            name: { $regex: nameFilter, $options: 'i' } // Case-insensitive regex match
          });
      
          if (products.length > 0) {
            return res.status(200).json({ data: products, message: "Success" });
          } else {
            return res.status(404).json({ data: [],message: "Product not found" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: error.message });
        }
}
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


export const addToWishList = async(req,res) =>
{
  try{
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    console.log("Product to be wishlisted:", product);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(userId);
    console.log("User adding to wishlist:", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("productId:",productId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({ message: "Added to wishlist", wishlist: user.wishlist });
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}



export const removeFromWishList = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }
    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    const user = await User.findById(userId); // populate products if needed
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("wishlist before removal: ", user.wishlist);

    // Remove product
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId.toString()
    );

    await user.save();

    console.log("wishlist after removal: ", user.wishlist);
    const updatedUser = await User.findById(userId).populate("wishlist");

    res.json({
      message: "Removed from wishlist",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({ message: error.message });
  }
};




export const getAllFromWishlist = async(req,res) =>
{
   try{
      const userId = req.body.userId;
      // const user = await User.findById(userId);
      // console.log("User fetching wishlist:", user);
      // if(!user) return res.status(404).json({ message: "User not found" });
      // const entireWishlist = await user.populate('wishlist');
      // if(!entireWishlist) return res.status(404).json({ message: "No item in wishlet yet" });

      const entireWishlist = await getAllWishlistFromService(userId);
      res.status(200).json({wishlist: entireWishlist});
   }
   catch(err)
   {
    console.log(err);
    res.status(500).json({ message: err.message });
   }
}



const getAllWishlistFromService = async(userId) =>
{
  try{
    const user = await User.findById(userId);
    console.log("User fetching wishlist:", user);
    if(!user) 
    {
      throw Error("User not found");
    }
    const entireWishlist = await user.populate('wishlist');
    if(!entireWishlist) 
    {
      throw Error("User not found");
    }
    return entireWishlist;
  }
  catch(err)
  {
    console.log(err);
    throw err;
  }
}