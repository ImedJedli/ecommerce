/* import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
const UpdateProfile = () => {


  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/images/avatar.png"
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      } else {
        setAvatarPreview("/assets/images/avatar.png");
      }
    }
    if (isUpdated) {
      toast.success("user updated !");
      dispatch(loadUser());
      navigate("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, toast, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    setEmailError("");
    setNameError("");

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (avatar) {
      formData.set("avatar", avatar);
    }

    let isValid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(file);
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (

      <div className="row">
      <div className="col-12 col-md-2">
      <Sidebar />
    </div>
    <Fragment>
      <Infos title={"Update profile"} />
      
      
     
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="/assets/images/update.jpg"
                    alt="login form"
                    className="img-fluid-update"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
      <div className="login-container">
            <div className="account section">
              <div className="container">
                <div className="row justify-content-center" style={{ marginLeft: '60px' }}>
                 
                    <div className="login-form  p-5">
                      <div className="text-center heading">
                        <h2 className="mb-2">Update profil</h2>
                        
                      </div>

                      

                      <form onSubmit={submitHandler}
                      encType="multipart/form-data">

                        <div className="form-group mb-4">
                          <label htmlFor="username">Username </label>
                          <input
                            type="username"
                            id="email_field"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                           // value={email}
                            //onChange={(e) => setEmail(e.target.value)}
                             className={`form-control ${
                              nameError ? "is-invalid" : ""
                            }`}
                            placeholder="Username"
                          />
                          { (
                            <div className="invalid-feedback">{}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email_field">Email</label>
                          

                          <input
                            id="email_field"
                            //value={password}
                            //onChange={(e) => setPassword(e.target.value)}
                            type="email"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                             className={`form-control  ${
                              emailError ? "is-invalid" : ""
                            }`} 
                            placeholder="Email"
                          />
                           { (
                            <div className="invalid-feedback">
                              {}
                            </div> 
                          )}
                        </div>

                        <div className="form-group">
                        <label htmlFor="avatar_upload">Avatar</label>
                        <div className="d-flex align-items-center">
                          <div>
                            <figure className="avatar mr-3 item-rtl">
                              <img
                                src={
                                  avatarPreview ||
                                  "/assetes/images/avatar.png"
                                }
                                className="rounded-circle"
                                alt="Avatar Preview"
                              />
                            </figure>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="avatar"
                              className="custom-file-input"
                              id="customFile"
                              accept="image/*"
                              onChange={onChange}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose Avatar
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 mb-4">
                      <button
                        className="btn btn-main mt-3 btn-block"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        Update
                      </button>
                    </div>
                      </form>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
          </div>
        
    </Fragment>
    </div>
  );
};
export default UpdateProfile;
 */

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const AdminPasswordUpdate = () => {
 
      
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isUpdated) {
      toast.success("password updated !");
      navigate("/admin/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, toast, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    setOldPasswordError("");
    setPasswordError("");

    let isValid = true;
    if (!oldPassword.trim()) {
      setOldPasswordError("Old password is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("New password is required");
      isValid = false;
    }

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <Infos title={"Update profile"} />
  
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/update.jpg"
                        alt="login form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="login-form  p-5">
                      <div className="card-body">
                        <div className="text-center heading">
                          <h2 className="mb-2">Update password</h2>
                        </div>
                        <form onSubmit={submitHandler}
                        >
  
                        <div className="form-group mb-4">
                        <label htmlFor="oldPassword">Old password </label>
                          <input
                            type="password"
                            id="password_field"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={`form-control ${
                              oldPasswordError ? "is-invalid" : ""
                            }`}
                            placeholder="Username"
                          />
                          { (
                            <div className="invalid-feedback">{oldPasswordError}</div>
                          )}
                        </div>


                     <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password_field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`form-control ${
                              passwordError ? "is-invalid" : ""
                            }`}
                            placeholder="New password"
                          />
                          { (
                            <div className="invalid-feedback">{passwordError}</div>
                          )}
                        </div>
  
                          
  
                        <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          disabled={loading ? true : false}
                        >
                          Update
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
        </div>
      </div>
    );
  };
  
  export default AdminPasswordUpdate;

