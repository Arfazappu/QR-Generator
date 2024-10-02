import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
  const { authToken, pending } = useAuth();

  if(pending){
    return 'Loading...'
  }

  return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
