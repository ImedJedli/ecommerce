import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeItemCart, saveShippingInfo } from "../../actions/cartActions";
import { clearErrors, createOrder } from "../../actions/orderActions";
import Infos from "../layout/Infos";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    fetch(`/api/v1/coupon/coupons?code=${code}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false && data.message) {
          toast.error(data.message);
        } else if (data.coupon) {
          const coupon = data.coupon;
          const usedCount = data.usedCount;
          const usageLimit = data.usageLimit;

          console.log("usedCount:", usedCount);
          console.log("usageLimit:", usageLimit);

          if (usedCount >= usageLimit) {
            toast.error("Coupon has reached its usage limit.");
          } else {
            setDiscount(coupon.discount);
            toast.success("Coupon applied successfully!");
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to apply the coupon.");
      });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { cartItems, shippingInfo, paymentInfo } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const itemsPrice =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  const shippingPrice = itemsPrice > 300 || !shippingInfo ? 0 : 7;
  const totalPrice = ((itemsPrice + shippingPrice) * (1 - discount)).toFixed(2);
  console.log(((itemsPrice + shippingPrice) * (1 - discount)).toFixed(2));
  const { error, success } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error, success, navigate]);

  const proceedToPaymentHandler = () => {
    const order = {
      orderItems: cartItems,
      shippingInfo,
      itemsPrice: itemsPrice,
      user,
      paymentInfo: {
        shippingPrice,
        totalPrice,
      },
    };

    localStorage.setItem("orderDetails", JSON.stringify(order));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    localStorage.removeItem("cartItems");

    dispatch(saveShippingInfo(shippingInfo));
    dispatch(
      createOrder(
        order,
        shippingInfo,
        cartItems,
        itemsPrice,
        shippingPrice,
        totalPrice
      )
    ).then(() => {
      toast.success("Order sent successfully!");
      navigate("/orders/me");
    });

    console.log("Order:", order);
  };

  return (
    <Fragment>
      <div className="checkout-container">
        <section className="page-shipping">
          <div className="overy"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="content text-center">
                  <div className="main-slider slider slick-initialized slick-slider">
                    <div className="slider-caption">
                      <h1 className="mt-2 mb-5">
                        <span className="text-color">Confirm </span>Order
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Infos title={"Order confirmation"} />
        <Fragment>
          <section className="cart shopping page-wrapper">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="product-list">
                    <form className="cart-form">
                      <table
                        className="table shop_table shop_table_responsive cart"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th className="product-thumbnail"> </th>
                            <th className="product-name">Product</th>
                            <th className="product-price">Price</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartItems.map((item) => (
                            <Fragment key={item.product}>
                              <tr className="cart_item">
                                <td
                                  className="product-thumbnail"
                                  data-title="Thumbnail"
                                >
                                  <a href="/product-single">
                                    <img
                                      src={`http://localhost:4000/products/${item.image}`}
                                      className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                      alt=""
                                    />
                                  </a>
                                </td>

                                <td
                                  className="product-name"
                                  data-title="Product"
                                >
                                  <a href="#">{item.name}</a>
                                </td>

                                <td
                                  className="product-price"
                                  data-title="Price"
                                >
                                  <span className="amount">
                                    <span className="currencySymbol">
                                      <pre wp-pre-tag-3=""></pre>
                                    </span>
                                    {item.quantity} x {item.price} DT={" "}
                                    <b>{item.quantity * item.price} DT</b>
                                  </span>
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                          <tr>
                            <td colSpan="6" className="actions">
                              <div className="coupon">
                                <input
                                  type="text"
                                  name="coupon_code"
                                  className="input-text form-control"
                                  id="coupon_code"
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                  placeholder="Coupon code"
                                />

                                <button
                                  type="button"
                                  className="btn btn-black btn-small ml-4"
                                  name="apply_coupon"
                                  value="Apply coupon"
                                  onClick={applyCoupon}
                                >
                                  Apply coupon
                                </button>
                                <span className="float-right mt-3 mt-lg-0"></span>
                              </div>
                              <input
                                type="hidden"
                                id="woocommerce-cart-nonce"
                                name="woocommerce-cart-nonce"
                                value="27da9ce3e8"
                              />
                              <input
                                type="hidden"
                                name="_wp_http_referer"
                                value="/cart/"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="cart-info card p-4 mt-4">
                        <h4 className="mb-4">Shipping information</h4>
                        <ul className="list-unstyled mb-4">
                          <li className="d-flex justify-content-between pb-2 mb-3">
                            <h5>Name</h5>
                            <span>{user && user.name}</span>
                          </li>
                          <li className="d-flex justify-content-between pb-2 mb-3">
                            <h5>Address:</h5>
                            <span>
                              {shippingInfo &&
                                `${shippingInfo.adress} ,${shippingInfo.city}`}
                            </span>
                          </li>
                          <li className="d-flex justify-content-between pb-2">
                            <h5>Phone Number</h5>
                            <span>
                              {shippingInfo && shippingInfo.phoneNumber}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="cart-info card p-4 mt-4">
                        <h4 className="mb-4">Order Summary</h4>
                        <ul className="list-unstyled mb-4">
                          <li className="d-flex justify-content-between pb-2 mb-3">
                            <h5>Items Price</h5>
                            <span>{itemsPrice} DT</span>
                          </li>
                          <li className="d-flex justify-content-between pb-2 mb-3">
                            <h5>Shipping</h5>
                            <span>{shippingPrice}</span>
                          </li>
                          <li className="d-flex justify-content-between pb-2">
                            <h5>Total</h5>
                            <span>{totalPrice} DT</span>
                          </li>
                        </ul>
                        {user ? (
                          <button
                            className="btn btn-main btn-small"
                            onClick={proceedToPaymentHandler}
                          >
                            Confirm
                          </button>
                        ) : (
                          <div className="alert alert-danger " type="alert">
                            <p>Please log in to confirm your order.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      </div>
    </Fragment>
  );
};
export default ConfirmOrder;
