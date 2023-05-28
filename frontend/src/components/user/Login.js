import React, { Fragment, useEffect, useState } from "react";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearErrors, login ,loadUser } from "../../actions/userAction";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";

const Login = () => {

  

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const location = useLocation();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const isAdmin = user && user.role ;
  console.log('admin or not ?' , isAdmin)

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const redirectToDashboard = () => {
    if (user && user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate(redirect);
    }
  };

  useEffect(() => {

    /* if (isAuthenticated) {
      console.log('user',user)
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate(redirect);
      }
    } */

    if (isAuthenticated) {
      setTimeout(() => {
        redirectToDashboard();
      }, 200); // Adjust the delay as needed
    }

 
    if (error) {
      dispatch(clearErrors());
    } else if (isAuthenticated && !loading) {
      
      alert.show("Login successful!, Welcome", {
        type: "success",
      });
      
    }
  }, [dispatch, user,alert, isAuthenticated, error,navigate,redirect,redirectToDashboard]);
  const submitHandler = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    dispatch(login(email, password));
   /*  dispatch(loadUser()); */
  };

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };


  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <Infos title={"Login"} />

          <div className="login-container">
              <div className="account section">
                  <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-lg-6">
                      <div className="login-form border p-5">
                          <div className="text-center heading">
                          <h2 className="mb-2">Login</h2>
                          <p className="lead">Don’t have an account? <Link to='/register'>Create a free account</Link></p>
                          </div>
              
                          <form onSubmit={submitHandler}>
                          <div className="form-group mb-4">
                              <label htmlFor="email_field">Enter username</label>
                              <input type="email" id="email_field" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={`form-control ${
                                  emailError ? "is-invalid" : ""
                                }`}
                                placeholder="Email address"
                              />
                              {emailError && (
                                  <div className="invalid-feedback">
                                    {emailError}
                                  </div>
                                )}
                          </div>
                          <div className="form-group">
                              <label htmlFor="password_field">Enter Password</label>
                              <Link to="/password/forgot" className="float-right" href="">Forget password?</Link>
                              
                              <input 
                              id="password_field"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              className={`form-control  ${
                                passwordError ? "is-invalid" : ""
                              }`}
                              placeholder="Password"
                            />
                            {passwordError && (
                                  <div className="invalid-feedback">
                                    {passwordError}
                                  </div>
                                )}
                          </div>
              
                          <div >
                            <button
                              className="btn btn-main mt-3 btn-block"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                          </form>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
          </div>
      </Fragment>
    )}
  </Fragment>
);
};

export default Login;
