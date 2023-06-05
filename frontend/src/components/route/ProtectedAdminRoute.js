import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === "admin";

  return (
    <Route
      {...props}
      element={
        isAuthenticated && isAdmin ? (
          props.element
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedAdminRoute;
