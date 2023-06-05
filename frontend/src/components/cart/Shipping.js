import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";
import { savePaymentInfo } from "../../actions/cartActions";
import Infos from "../layout/Infos";
import Checkout from "./Checkout";

const Shipping = () => {
  const [adressError, setAdressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const { shippingInfo } = useSelector((state) => state.cart);
  const { paymentInfo } = useSelector((state) => state.cart);

  const [adress, setAdress] = useState(shippingInfo.adress || "");
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setAdressError("");
    setCityError("");
    setPhoneNumberError("");

    let isValid = true;
    if (!adress.trim()) {
      setAdressError("Adress is required");
      isValid = false;
    } else if (adress.trim().length < 4) {
      setAdressError("Address must be at least 4 characters long");
      isValid = false;
    } 

    if (!city.trim()) {
      setCityError("City is required");
      isValid = false;
    } else if (city.trim().length < 4) {
      setCityError("City must be at least 4 characters long");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(city.trim())) {
      setCityError("City must contain only characters");
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone is required");
      isValid = false;
    } else if (phoneNumber.trim().length !== 8) {
      setPhoneNumberError("Phone number must be 8 characters long");
      isValid = false;
    }
    if (isValid) {
      dispatch(saveShippingInfo({ adress, city, phoneNumber }));
      navigate("/order/confirm");
    }
  };

  return (
    <Fragment>
      <Infos title={"Shipping Information"} />
      <section className="page-shipping">
        <div className="overy"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <div className="main-slider slider slick-initialized slick-slider">
                  <div className="slider-caption">
                    <h1 className="mt-2 mb-5">
                      <span className="text-color">Shipping </span>Information
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Checkout shipping />

      <div className="login-container">
        <div className="account section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="login-form border p-5">
                  <div className="text-center heading">
                    <h2 className="mb-2">Shipping Information</h2>
                  </div>

                  <form onSubmit={submitHandler}>
                    <div className="form-group mb-4">
                      <i class="fa fa-map-marker"></i>

                      <label htmlFor="adress_field" className="ml-2">
                        Adress :
                      </label>
                      <input
                        type="text"
                        id="adress_field"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        className={`form-control ${
                          adressError ? "is-invalid" : ""
                        }`}
                        placeholder="Adress"
                      />
                      {adressError && (
                        <div className="invalid-feedback">{adressError}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <i class="fa fa-location-arrow"></i>

                      <label htmlFor="city_field" className="ml-2">
                        City :
                      </label>

                      <input
                        id="password_field"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        className={`form-control ${
                          cityError ? "is-invalid" : ""
                        }`}
                        placeholder="City"
                      />
                      {cityError && (
                        <div className="invalid-feedback">{cityError}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <i class="fa fa-phone"></i>
                      <label htmlFor="phone_field" className="ml-2">
                        Phone Number :
                      </label>

                      <input
                        id="password_field"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="text"
                        className={`form-control ${
                          phoneNumberError ? "is-invalid" : ""
                        }`}
                        placeholder="Phone number"
                      />
                      {phoneNumberError && (
                        <div className="invalid-feedback">
                          {phoneNumberError}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        className="btn btn-main mt-3 btn-block"
                        type="submit"
                      >
                        Continue
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

export default Shipping;
