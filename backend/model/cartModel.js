// models/cartModel.js
import mongoose from "mongoose";

// const cartItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.Mixed,
//     ref: "Product",
//     required: true,
//   },
//   count: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1,
//   },
// });

// const cartSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       // one active cart per user
//     },
//     items: [cartItemSchema],
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//     },
//     status:
//     {
//         type: String,
//         required: true,
//         enum: ["active" , "order_in_progress" ,"completed"],
//         default: "active"
//     }
//   },
//   { timestamps: true }
// );

// const Cart = mongoose.model("Cart", cartSchema);
// export default Cart;



const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    price: Number,
    image: String,
    portion: String,
    count: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "order_in_progress", "completed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
