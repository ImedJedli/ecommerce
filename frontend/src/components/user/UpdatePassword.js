import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import { toast } from "react-toastify";

const UpdatePassword = () => {

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
      navigate("/me");

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
    <Fragment>
      <Infos title={"Change password"} />

     
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/assets/images/update.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>

                 <div className="login-container">
            <div className="account section">
              <div className="container">
                <div className="row justify-content-center" style={{ marginLeft: '60px' }}>
                 
                    <div className="login-form  p-5">
                      <form onSubmit={submitHandler}>
                        
                        <div className="text-center heading">
                        <h2 className="mb-2">Update password</h2>
                        
                      </div>

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
                            <div className="invalid-feedback">{}</div>
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
                            <div className="invalid-feedback">{}</div>
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
      </div>
      </div>
      </div>
    </Fragment>
  );
};
export default UpdatePassword;
