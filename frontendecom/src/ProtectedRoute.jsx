import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // assuming role is in redux

const ProtectedRoute = ({ allowedRoles }) => {
 
    // const user = useSelector((state) => state.login.userData);

    const userName = sessionStorage.getItem("name");
    const userRole = sessionStorage.getItem("role");

  if (!userRole) {
    // if not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // logged in but role not allowed → redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  // role allowed → render the nested route
  return <Outlet />;
};

export default ProtectedRoute;
