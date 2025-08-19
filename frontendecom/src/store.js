// import { asyncThunkCreator, configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './slices/apislice';
// import cartSliceReducer from './slices/cartSlices';
// import { createStore } from 'redux';
// import { Rootreducer } from './reducers/Rootreducer';

// let middlewareList = [asyncThunkCreator];

// const store = configureStore({reducer: Rootreducer});

// console.log("store-->",store);
// const store = configureStore({
//   reducer: {
//     // [apiSlice.reducerPath]: apiSlice.reducer,
//     // cart: cartSliceReducer,
//     // devTools: composeWithDevTools(),
//     reducer: rootreducer,
//     middleware: middlewareList
//   },
//   // //middleware: (getDefaultMiddleware) =>
//   //  // getDefaultMiddleware().concat(apiSlice.middleware),

//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware({
//   //     serializableCheck: false,
//   //   }).concat(apiSlice.middleware),
//   //   devTools: process.env.NODE_ENV !== 'production'
// });


import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { cartReducer } from './reducers/CartReducer';
import { loginReducer } from './reducers/LoginReducer';
import { orderReducer } from './reducers/OrderReducer';
import workflowReducer from './reducers/workflowReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  login: loginReducer,
  order: orderReducer,
  workflow: workflowReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;


