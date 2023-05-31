import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getSingleCoupon,
  updateCoupon,
} from "../../actions/couponActions";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const UpdateCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  const { loading, error: updateError } = useSelector(
    (state) => state.allCoupons
  );
  const { error, coupon } = useSelector((state) => state.couponDetails);

  const couponId = id;

  useEffect(() => {
    if (coupon && coupon._id !== couponId) {
      dispatch(getSingleCoupon(couponId));
    } else {
      setCode(coupon.code);
      setDiscount(coupon.discount);
      setUsageLimit(coupon.usageLimit);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error, updateError, coupon, couponId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("code", code);
    formData.set("discount", discount);
    formData.set("usageLimit", usageLimit);

    dispatch(updateCoupon(coupon._id, formData)).then(() => {
      toast.success("Coupon is updated successfully !");
      navigate("/admin/coupons");
    });
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
                        <h2 className="mb-2">Update categorie</h2>
                      </div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <div className="form-group mb-4">
                          <label htmlFor="code_field">Code</label>
                          <input
                            type="text"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="form-control "
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="discount_field">Discount</label>
                          <input
                            type="text"
                            name="discount"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="form-control "
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="usageLimit_field">Usage Limit</label>
                          <input
                            type="text"
                            name="usageLimit"
                            value={usageLimit}
                            onChange={(e) => setUsageLimit(e.target.value)}
                            className="form-control "
                          />
                        </div>

                        <button
                          id="register_button"
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                          disabled={loading ? true : false}
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
};

export default UpdateCoupon;
