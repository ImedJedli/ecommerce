import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetails,
  loadUser,
  updateUser,
  register
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

function AdminCreateUser() {
 

      const [nameError, setNameError] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      const [roleError, setRoleError] = useState("");
    
      const navigate = useNavigate();
      const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role:""
      });
      const { name, email, password ,role} = user;
      const [avatar, setAvatar] = useState("");
      const [avatarPreview, setAvatarPreview] = useState(
        "/assets/images/avatar.png"
      );
    
      const dispatch = useDispatch();
      const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
      );
    
      useEffect(() => {
        
        if (error) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error);
          }
          dispatch(clearErrors());
        } else {
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
        setRoleError("");
    
       /*  let isValid = true;
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

        if (!role.trim()) {
            setNameError("Role is required");
            isValid = false;
          } */
    
        //if (isValid) {
          const formData = new FormData();
          formData.set("name", name);
          formData.set("email", email);
          formData.set("password", password);
          formData.set("role", role);
          if (avatar) {
            // check if avatar is not empty
            formData.append("avatar", avatar);
          }
          dispatch(register(formData));
       // }
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
      <Infos title="create blog" />
      <div className="row">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="signUp-container">
            <div className="account section">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="login-form border p-5">
                      <div className="text-center heading">
                        <h2 className="mb-2">Add user</h2>
                      </div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <div className="form-group">
                          <label htmlFor="name_field">Name</label>
                          <input
                            type="name"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                             onChange={onChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="email_field">Email</label>
                          <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password_field">Password</label>
                          <input
                            type="password"
                            id="email_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="role_field">Role</label>

                          <select
                            id="role_field"
                            className="form-control"
                            name="role"
                            value={role}
                            onChange={onChange}
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            <option value="deliver">deliver</option>
                          </select>
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

                        <button
                          id="register_button"
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminCreateUser;
