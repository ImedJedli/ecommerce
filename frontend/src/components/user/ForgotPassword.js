import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }

      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, alert, error, loading, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    let isValid = true;
    setEmailError("");
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (isValid) {
      const formData = new FormData();
      formData.set("email", email);

      dispatch(forgotPassword(formData));
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h3 className="mb-2 h2">Password Recovery</h3>
                  <p className="lead">
                    Please enter the email address for your account. A
                    verification code will be sent to you. Once you have
                    received the verification code, you will be able to choose a
                    new password for your account.
                  </p>
                </div>

                <form onSubmit={submitHandler}>
                  <div className="form-group mb-4">
                    <label for="#">Enter Email Address</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`form-control  ${
                        emailError ? "is-invalid" : ""
                      }`}
                      placeholder="Email address"
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading ? true : false}
                    className="btn btn-main mt-3 btn-block"
                  >
                    Reset your password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
