
import { Navigate, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';



  const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const  { loading , user } = useSelector(state => state.auth);

    const role = useSelector(state => state.auth.user.role);
  
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    console.log("auth:",isAuthenticated);
    console.log("role",role)


    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Navigate to='/login' />
                        }

                        if (isAdmin === true && role !== 'admin') {
                            return <Navigate to="/" />
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute