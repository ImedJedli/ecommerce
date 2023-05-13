
import { Navigate, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

const ProtectedRoute = () =>{

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.user.role);

  console.log("login in : ",isAuthenticated);
  console.log("user role : ",role);

  /*if (isAuthenticated ) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }*/

  if (!isAuthenticated || !role) {
    return <Navigate to="/" />;
  }
  
  // Render the protected routes
  return <Outlet />;

}

export default ProtectedRoute;
