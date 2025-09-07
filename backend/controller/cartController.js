import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";

export const createCart = async(req,res) =>
{
    try{
            const userId =  req.body.user;
            console.log("userId from req body:",userId);
            const existingActiveCart = await Cart.findOne({ user: userId, status:"active"});
            // const existingInitiatedCart = await Cart.find({ userId, status: "initiated"});
            console.log("existing active cart -->",existingActiveCart);
            // console.log("existing initiated cart -->", existingInitiatedCart);
            
            const cartItems = req.body?.cartItems;

            if(!existingActiveCart )
            {
                const cart = new Cart({
                user:  userId,
                items: cartItems ? cartItems : [],
                status: "active"
            }
            )
                const createdCart = await cart.save();
                console.log(createdCart);
                res.status(200).json({createdCart});
            }
            else{
                console.log("Cart already exists for this user.",existingActiveCart);
                res.status(200).json({ message: "Cart already exists for this user.", json: existingActiveCart });
            }
            
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

// export const getCartByUserId = async(req,res) =>
// {
//     try{
//         const userId = req.params.userId;
//         const cart = await Cart.find({ user: userId });
//         if(!cart) return res.status(404).json({ message: "Cart not found for this user."});
//         res.status(200).json({message: "Cart found",cart: cart});
//     }
//     catch(err)
//     {
//         console.log(err);
//         res.status(500).json({ message: "Server error. Please try again later." });
//     }
// }


export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const carts = await Cart.find({ user: userId });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "No carts found for this user." });
    }

    res.status(200).json({
      message: "Carts found",
      carts,   // always an array
    });
  } catch (err) {
    console.error("Error fetching carts:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const updateCart = async(req,res) =>
{
    try{
        const user = req.body.userId;
        const status = req.body?.status ?  req.body?.status:"active";
        const cartItems = req.body.cartItems;

        const existingCart = await Cart.findOne({ user, status:"active"})
    }
    catch(err)
    {

    }
}



// export const addToCart = async (req, res) => {
//   try {
//     const  userId = req.body.userId;   // from body
//     const quantity = req.body.quantity || 1;
//     const products = req.body.items;      // from params

//     if (!userId) {
//       return res.status(400).json({ message: "UserId is required" });
//     }

//     let cart = await Cart.findOne({ user: userId, status: "active" });
    
//     if (!cart) {
//         console.log("Cart not found for user:", userId);
//       cart = new Cart({ user: userId, items: [], status: "active" });
//     }

//     console.log(cart);
//     const existingItem = cart.items.find(
//       (item) => String(item.product) === String(products)
//     );

//     if (existingItem) {
//       existingItem.count += quantity;
//     } else {
//       cart.items.push({ product: productId, count: quantity });
//     }

//     await cart.save();
//     await cart.populate("items.product");

//     res.status(200).json({ cart });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const addToCart = async (req, res) => {
  try {
    const { userId, items = [] } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be a non-empty array" });
    }

    let cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], status: "active" });
    }

    for (const item of items) {
      const productId = item._id; // accept either
      const count = item.count || 1;
      if (!productId) continue;

      // fetch product details
      const product = await Product.findById(productId);
      console.log("Product to be added to cart:", product);
      if (!product) continue;

      const existingItem = cart.items.find(
        (i) => String(i.productId) === String(productId)
      );

      if (existingItem) {
        existingItem.count += count;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          portion: product.portion,
          image: product.image,
          count
        });
      }
    }
    console.log("Cart after adding items:", cart);
    await cart.save();
    res.status(200).json({ message:"added to cart successfully",cart: cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item in cart
    const existingItem = cart.items.find(
      (item) => String(item.product) === String(productId)
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (existingItem.count > 1) {
      // Just decrease the count
      existingItem.count -= 1;
    } else {
      // Remove the item completely
      cart.items = cart.items.filter(
        (item) => String(item.product) !== String(productId)
      );
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ cart });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const changeCartStatus = async (req, res) => {
  try {
    const  userId  = req.body.userId;
    console.log("userId from req body:",userId);
    const { status } = req.body;
    const cart = await Cart.findOne({ user: userId, status: "active" });
    console.log("Cart to be updated:", cart);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.status = status;
    await cart.save();
    res.status(200).json({ cart });
  } catch (err) {
    console.error("Error changing cart status:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// export const createCart = async (req, res) => {
//   try {
//     const { userId, items } = req.body;
//     const existingCart = await Cart.findOne({ user: userId });
    
//     if (existingCart.status === "active") {
//       return res.status(400).json({ message: "Cart already exists for this user." });
//     }
//   }
//   catch(error) {
//     return res.status(500).json({ message: "Server error", error });
//   }
// }

// 