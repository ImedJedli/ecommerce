import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemCart } from "../../actions/cartActions";
import Infos from "../layout/Infos";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");

  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeItem = (id) => {
    dispatch(removeItemCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      const totalPrice = cartItems
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2);
      localStorage.setItem("paymentInfo", JSON.stringify({ totalPrice }));
      navigate("/shipping", { replace: true });
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  return (
    <Fragment>
      <div className="checkout-container">
        <section className="page-cart">
          <div className="overy"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="content text-center">
                  <div className="main-slider slider slick-initialized slick-slider">
                    <div className="slider-caption">
                      <h1 className="mt-2 mb-5">
                        <span className="text-color">Cart </span>Information
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Infos title={"Your Cart"} />
        {cartItems.length === 0 ? (
          <h2 className="mt-5 text-center">Your Cart is Empty</h2>
        ) : (
          <Fragment>
            <h2 className="mt-5 text-center">
              {" "}
              Cart: <b>{cartItems.length} items</b>
            </h2>

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
                              <th className="product-quantity">Quantity</th>
                              <th className="product-subtotal">Action</th>
                              <th className="product-remove"> </th>
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
                                      {item.price}
                                    </span>
                                  </td>
                                  <td
                                    className="product-quantity"
                                    data-title="Quantity"
                                  >
                                    <div className="quantity">
                                      <span
                                        className="btn btn-danger minus"
                                        onClick={() =>
                                          decreaseQuantity(
                                            item.product,
                                            item.quantity
                                          )
                                        }
                                      >
                                        -
                                      </span>

                                      <input
                                        type="number"
                                        id="qty"
                                        className="input-text qty text"
                                        step="1"
                                        min="0"
                                        max="9"
                                        title="Qty"
                                        size="4"
                                        value={item.quantity}
                                        readOnly
                                      />
                                      <span
                                        className="btn btn-primary plus"
                                        onClick={() =>
                                          increaseQuantity(
                                            item.product,
                                            item.quantity,
                                            item.stock
                                          )
                                        }
                                      >
                                        +
                                      </span>
                                    </div>
                                  </td>

                                  <td
                                    className="product-remove"
                                    data-title="Remove"
                                  >
                                    <a
                                      href="#"
                                      className="remove"
                                      aria-label="Remove this item"
                                      data-product_id="30"
                                      data-product_sku=""
                                      onClick={() => removeItem(item.product)}
                                    >
                                      ×
                                    </a>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </tbody>
                        </table>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-lg-4">
                    <div className="cart-info card p-4 mt-4">
                      <h4 className="mb-4">Cart totals</h4>
                      <ul className="list-unstyled mb-4">
                        <li className="d-flex justify-content-between pb-2 mb-3">
                          <h5>Items Number</h5>
                          <span>
                            {cartItems.reduce(
                              (acc, item) => acc + Number(item.quantity),
                              0
                            )}{" "}
                            (Item)
                          </span>
                        </li>

                        <li className="d-flex justify-content-between pb-2">
                          <h5>Total</h5>
                          <span>
                            {(
                              cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                              ) *
                              (1 - discount)
                            ).toFixed(2)}{" "}
                            DT
                          </span>
                        </li>
                      </ul>
                      <button
                        className="btn btn-main btn-small"
                        onClick={checkoutHandler}
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
