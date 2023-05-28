import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

  const { user, loading ,isAuthenticated } = useSelector((state) => state.auth);

  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdminn = user && user.role;


  console.log('login auth:',isAuthenticated)
  console.log("login role",isAdminn)

  //const role = useSelector(state => state.auth.user && state.auth.user.role);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

   if (isAdmin === true && isAdminn !== 'admin') {
    return <Navigate to="/" />;
  }
 
  return <Route {...rest} element={<Component />} />;
};




export default ProtectedRoute;
