import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  // Example: retrieve user data from localStorage (or from Redux / Context)
  const userData = JSON.parse(localStorage.getItem("userData"));

  // If no user data, redirect to login
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed, redirect to "not authorized" page
  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
