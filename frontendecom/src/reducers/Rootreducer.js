import { cartReducer } from "./CartReducer";
import { combineReducers } from "redux";

// export default combinerReducers({
//     cartReducer
// })

// export const Rootreducer = combineReducers({
//     cart: cartReducer
// });

export const Rootreducer = combineReducers({
  cart: cartReducer
});


