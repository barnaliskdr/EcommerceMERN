import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import App from './App';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchedProducts from './pages/SearchedProducts';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<Profile/>} />
      <Route path="products/:name" element={<SearchedProducts />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





//-----------------------------------------------------------------------------------------------------------------------
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { reducer as formReducer } from "redux-form";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import { routerReducer, routerMiddleware } from "react-router-redux";
// import { createBrowserHistory } from "history";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import rootReducer from "./RootReducer";
// import Login from "./Layout/Login/Login";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { PrimeReactProvider } from "primereact/api";
// //theme
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
// import "primeflex/primeflex.css";
// import NotRouteFound from "./Shared/Component/NotRouteFound";

// let middlewareList = [];
// const history = createBrowserHistory();
// //set the middleware according to the env
// middlewareList = [thunk, logger, routerMiddleware(history)];

// const store = configureStore({
//   reducer: {
//     ...rootReducer,
//     routing: routerReducer,
//     form: formReducer,
//   },
//   middleware: middlewareList,
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     {/* Tell the Router to use our enhanced history */}
//     <Router history={history}>
//       <PrimeReactProvider>
//         <Routes>
//           <Route index element={<Navigate to="/Login" />} />
//           <Route path="/login/*" name="Login Page" Component={Login} />
//           <Route path="/*" name="Home" Component={App} />
//           <Route path="/404" name="404 Not Found" Component={NotRouteFound} />
//         </Routes>
//       </PrimeReactProvider>
//     </Router>
//   </Provider>
// );

// export { store };

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

