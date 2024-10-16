// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  element: React.ReactElement; // The component to render if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
