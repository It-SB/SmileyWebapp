import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const PrivateRoute = ({ children }) => {
  const { user, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  if (user) {
    return children; // If the user is authenticated, render the protected page
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
