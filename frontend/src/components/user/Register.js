import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, register } from "../../actions/userAction";
import Infos from "../layout/Infos";
import { toast } from "react-toastify";

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/images/avatar.png"
  );

  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
      dispatch(clearErrors());
    } else if (isAuthenticated) {
      toast.success(" Account created , Welcome to DropSell !", {
        type: "success",
      });
    }
  }, [dispatch, toast, isAuthenticated, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else if (password === name || password === email) {
      setPasswordError("Password must be different from name and email");
      isValid = false;
    }

    if (isValid) {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      if (avatar) {
        // check if avatar is not empty
        formData.append("avatar", avatar);
      }
      dispatch(register(formData));
    }
  };
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <Infos title="register User" />
      <div className="signUp-container">
        <div className="account section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="login-form border p-5">
                  <div className="text-center heading">
                    <h2 className="mb-2">Sign Up</h2>
                    <p className="lead">
                      Already have an account? <a href="/login"> Login now</a>
                    </p>
                  </div>

                  <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="form-group mb-4">
                      <label htmlFor="email_field">Enter Email Address</label>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className={`form-control ${
                          emailError ? "is-invalid" : ""
                        }`}
                        placeholder="Email adress"
                      />
                      {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="name_field">Enter username</label>
                      <a className="float-right" href="">
                        Forget password?
                      </a>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className={`form-control  ${
                          nameError ? "is-invalid" : ""
                        }`}
                        placeholder="Full name"
                      />
                      {nameError && (
                        <div className="invalid-feedback">{nameError}</div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password_field">Enter Password</label>
                      <input
                        value={password}
                        name="password"
                        onChange={onChange}
                        type="password"
                        className={`form-control  ${
                          passwordError ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                      />
                      {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="avatar_upload"></label>
                      <div className="d-flex align-items-center">
                        <div>
                          <figure
                            className="avatar mr-3 item-rtl"
                            style={{ width: "40px" }}
                          >
                            <img
                              src={avatarPreview}
                              className="rounded-circle"
                              style={{ width: "40px" }}
                              alt="Avatar Preview"
                            />
                          </figure>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="avatar"
                            className="custom-file-input"
                            style={{ width: "40px" }}
                            id="customFile"
                            accept="images/*"
                            onChange={onChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Choose Image
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Register
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
  );
};

export default Register;
