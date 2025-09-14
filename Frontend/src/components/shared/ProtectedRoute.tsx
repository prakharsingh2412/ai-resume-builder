import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  component?: React.ComponentType;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return Component ? <Component /> : <>{children}</>;
};

export default ProtectedRoute;