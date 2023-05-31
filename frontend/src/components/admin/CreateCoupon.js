import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCoupon, clearErrors } from "../../actions/couponActions";
import {
  CREATE_COUPON_RESET
} from "../../constants/couponConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";

const CreateCoupon = () => {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    usageLimit:""
  });

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [usageLimit , setUsageLimit] = useState("")


  const [codeError, setCodeError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [usageLimitError , setUsageLimitError] = useState("")

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector((state) => state.newCoupon);
  useEffect(() => {
    if (error) {
      if (error.response && error.response.data.message) {
        alert.error(error.response.data.message);
      } else {
        alert.error(error);
      }
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({ type: CREATE_COUPON_RESET });
      alert.success("coupon created successfully");
      navigate("/admin/coupons");
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    setCodeError("");
    setDiscountError("");
    setUsageLimitError("");

    let isValid = true;
    if (!code.trim()) {
      setCodeError("Code is required");
      isValid = false;
    }

    if (!discount.trim()) {
      setDiscountError("Discount is required");
      isValid = false;
    }

    if (!usageLimit.trim()) {
      setUsageLimitError("Usage limit is required");
      isValid = false;
    }

    const formData = new FormData();
    formData.set("code", code);
    formData.set("discount", discount);
    formData.set('usageLimit' , usageLimit);
    dispatch(addCoupon(formData));
  };

  const onChange = (e) => {
    setCoupon({ ...coupon, [e.target.code]: e.target.value });
  };

  const handleDiscountChange = (value) => {
    setDiscount(value);
  };

  const handleUsageLimitChange = (value) => {
      setUsageLimit(value);
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
                        <h2 className="mb-2">Create coupon</h2>
                      </div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <div className="form-group mb-4">
                          <label htmlFor="name_field">Code</label>
                          <input
                            type="text"
                            name="name"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className={`form-control ${
                              codeError ? "is-invalid" : ""
                            }`}
                            placeholder="Code"
                          />
                          {codeError && (
                            <div className="invalid-feedback">{codeError}</div>
                          )}
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="#">Discount</label>
                          <input
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                           
                            className={`form-control ${
                              discountError ? "is-invalid" : ""
                            }`}
                            placeholder="Discount"
                          />
                          {discountError && (
                            <div className="invalid-feedback">{discountError}</div>
                          )}
                          
                        </div>


                        <div className="form-group mb-4">
                          <label htmlFor="#">Usage Limit</label>
                          <input
                            value={usageLimit}
                            onChange={(e) => setUsageLimit(e.target.value)}
                            
                            className={`form-control ${
                              usageLimitError ? "is-invalid" : ""
                            }`}
                            placeholder="Usage Limit"
                          />
                          {usageLimitError && (
                            <div className="invalid-feedback">{usageLimitError}</div>
                          )}
                          
                        </div>
      
                        <button
              id="register_button"
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              disabled={loading ? true : false}
            >
              Create
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
};

export default CreateCoupon;
