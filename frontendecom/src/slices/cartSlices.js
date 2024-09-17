import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
        cartTotalQuantity: 0,
        // cartItem: 0,
        cartTotalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartProducts.findIndex((item) => item._id === action.payload._id)
            
            if(itemIndex >= 0){
                state.cartProducts[itemIndex].cartTotalQuantity += 1;
                state.cartTotalPrice += state.cartProducts[itemIndex].price;
            }
            else{
                const item = {...action.payload, cartTotalQuantity:1};
                state.cartTotalPrice += action.payload.price;
                // state.cartItem += 1;
                state.cartTotalQuantity += 1;
                state.cartProducts.push(item);
                console.log("item--",item);
            }
            const cartData = JSON.stringify(state);
            console.log("cartData--->",cartData);
            sessionStorage.setItem("cart", cartData);
            
            // console.log("Cart data saved to sessionStorage:", cartData);
            // console.log("Final cart state:", state.cartProducts);
        },

        // removeFromCart: (state, action) => {    
        //         console.log("action--->",action.payload);
        //         const cart = JSON.parse(sessionStorage.getItem("cart")); 
        //         const cartProducts = cart.cartProducts;   
        //         console.log("cart--->",cart);
        //         console.log("cartProducts--->",cart.cartProducts);
        //         //console.log("State",state);
        //         const itemIndex = cartProducts.findIndex((item) => item._id === action.payload._id);
        //         console.log("itemIndex--->",itemIndex);
        //         console.log("cartProducts[itemIndex].cartTotalQuantity--->",cartProducts[itemIndex].cartTotalQuantity);
        //         if(itemIndex >= 0 && cartProducts[itemIndex].cartTotalQuantity > 0){
        //             console.log("inside the loop");
        //             state.cartProducts[itemIndex].cartTotalQuantity -= 1;

        //             console.log("cartProducts[itemIndex].cartTotalQuantity--->",cartProducts[itemIndex].cartTotalQuantity);
        //             state.cartTotalPrice -= state.cartProducts[itemIndex].price;

        //             sessionStorage.setItem("cart", JSON.stringify(cart));
        //             console.log(JSON.stringify(cart));
        //         }
        //         else
        //         {
        //             console.log("item not found");
        //         }
        //     console.log("final state",state.cartProducts);
        
        // }


        removeFromCart: (state, action) => {
            // Find the index of the item to be removed
            const itemIndex = state.cartProducts.findIndex((item) => item._id === action.payload._id);
        
            if (itemIndex >= 0) {
                const item = state.cartProducts[itemIndex];
        
                if (item.cartTotalQuantity > 1) {
                    // Decrease item quantity and update total price
                    item.cartTotalQuantity -= 1;
                    state.cartTotalPrice -= item.price;
                } else {
                    // Remove item from cart if quantity is 1
                    state.cartProducts.splice(itemIndex, 1);
                    state.cartTotalPrice -= item.price;
                }
        
                // Update total quantity of items in cart
                state.cartTotalQuantity -= 1;
                
                console.log("Updated cartProducts:", state.cartProducts);
                console.log("Updated total price:", state.cartTotalPrice);
                console.log("Updated total quantity:", state.cartTotalQuantity);
        
                // Save updated cart to sessionStorage
                const cartData = JSON.stringify(state);

                sessionStorage.setItem("cart", cartData);
                console.log("Cart data saved to sessionStorage:", cartData);
            } else {
                console.log("Item not found in cart");
            }
        
            console.log("Final cart state:", state.cartProducts);
        },
        
    },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


// Load cart data from sessionStorage if available, or use the default initial state
// const storedCart = sessionStorage.getItem('cart');
// const initialState = storedCart
//   ? JSON.parse(storedCart)
//   : {
//       cartProducts: [],
//       cartTotalQuantity: 0,
//       cartTotalPrice: 0,
//     };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState, // Use the loaded initial state or default state
//   reducers: {
//     addToCart: (state, action) => {
//       const itemIndex = state.cartProducts.findIndex((item) => item._id === action.payload._id);

//       if (itemIndex >= 0) {
//         state.cartProducts[itemIndex].cartTotalQuantity += 1;
//         state.cartTotalPrice += state.cartProducts[itemIndex].price;
//       } else {
//         const item = { ...action.payload, cartTotalQuantity: 1 };
//         state.cartTotalPrice += action.payload.price;
//         state.cartTotalQuantity += 1;
//         state.cartProducts.push(item);
//       }

//       // Save updated cart state to sessionStorage
//       sessionStorage.setItem('cart', JSON.stringify(state));
//     },
//     removeFromCart: (state, action) => {
//       const itemIndex = state.cartProducts.findIndex((item) => item._id === action.payload._id);

//       if (itemIndex >= 0) {
//         const item = state.cartProducts[itemIndex];

//         if (item.cartTotalQuantity > 1) {
//           item.cartTotalQuantity -= 1;
//           state.cartTotalPrice -= item.price;
//         } else {
//           state.cartProducts.splice(itemIndex, 1);
//           state.cartTotalPrice -= item.price;
//         }

//         state.cartTotalQuantity -= 1;

//         // Save updated cart state to sessionStorage
//         sessionStorage.setItem('cart', JSON.stringify(state));
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
