import React , {Fragment} from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

/* const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

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
*/
  const ProtectedRoute=() =>
  //({ isAllowed,
  /*   redirectPath = '/login',
      children,
    }) => {
      console.log('isAllowed:', isAllowed);
    if (!isAllowed) {
     
      return <Navigate to={redirectPath} replace />
      
    }
    else{
      return children;
    }
 
  }; */

  console.log('')
  export default ProtectedRoute;  





  
 /*  
  const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  
      const { isAuthenticated, loading, user } = useSelector(state => state.auth)
  
      return (
          <Fragment>
              {loading === false && (
                  <Route
                      {...rest}
                      render={props => {
                          if (isAuthenticated === false) {
                              return <Navigate to='/login' />
                          }
  
                          if (isAdmin === true &&  user && user.role !== 'admin') {
                              return <Navigate to="/" />
                          }
  
                          return <Component {...props} />
                      }}
                  />
              )}
          </Fragment>
      )
  }
  
  export default ProtectedRoute */


  

/* const ProtectedRoute = ({ isAdmin, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);

  if (loading) {
    return null; // or display a loading spinner if desired
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Route {...rest} />;
};

export default ProtectedRoute; */



