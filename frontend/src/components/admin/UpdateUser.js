import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getUserDetails, loadUser, updateUser } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";

function UpdateUser() {
      
  const {id} = useParams()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, isUpdated } = useSelector(state => state.user);
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
      setRole(user.role)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("user updated !");
      dispatch(loadUser());
      navigate("/admin/users");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated,user,userId]);

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
      dispatch(updateUser(user._id,formData));
    }
  };

  return (
    <Fragment>
      <Infos title={`Update User : `} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

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
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateUser;
