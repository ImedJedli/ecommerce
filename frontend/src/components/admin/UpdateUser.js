import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetails,
  loadUser,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

function UpdateUser() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const userId = id;

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(userId));
    } else if (user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("user updated !");
      dispatch(loadUser());
      navigate("/admin/users");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, toast, error, navigate, isUpdated, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (user) {
      console.log("Updating user with ID:", user._id);
      console.log("New name:", name);
      console.log("New email:", email);
      console.log("New role:", role);

      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("role", role);
      dispatch(updateUser(user._id, formData));
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
                        <h2 className="mb-2">Update user</h2>
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="role_field">Role</label>

                          <select
                            id="role_field"
                            className="form-control"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            <option value="deliver">deliver</option>
                          </select>
                        </div>

                        <button
                          id="register_button"
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Update
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

export default UpdateUser;
