import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

const ProfileAdmin = () => {
  console.log(
    "state.auth:",
    useSelector((state) => state.auth)
  );

  const { user = { name: "", email: "", avatar: "" }, loading } = useSelector(
    (state) => state.auth
  );

  return (
      <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Infos title={"Welcome to your profile"} />
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="title text-center">
                  <h2 className="text-color">My Profile</h2>
                  <p>Welcome back ! </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                  {user.avatar && (
                    <img
                      className="rounded-circle img-fluid"
                      src={`http://localhost:4000/avatars/${user.avatar}`}
                      alt={user.name}
                    />
                  )}
                </figure>
                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Join On : </h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className="btn btn-danger btn-block mt-5"
                  >
                    My Orders
                  </Link>
                )}

                <Link
                  to="/admin/password/update"
                  className="btn btn-primary btn-block mt-3"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ProfileAdmin;
