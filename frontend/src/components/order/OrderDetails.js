import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector(
    (state) => state.orderDetails
  );

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error, id]);

  const shippingDetails =
    shippingInfo && `${shippingInfo.adress},${shippingInfo.city}`;

  return (
    <Fragment>
      <Infos title={`Order Status : ${order._id}`} />
      <div className="row">
        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h1 className="my-5">Order # {order._id}</h1>
                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user && user.name}
                  </p>

                  <p>
                    <b>Email :</b>
                    {user && user.email}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> {paymentInfo && paymentInfo.totalPrice} DT
                  </p>

                  <p>
                    <b>Shipping:</b> {paymentInfo && paymentInfo.shippingPrice}{" "}
                    DT
                  </p>

                  <hr />

                  <h4 className="my-4">Order Status:</h4>
                  <p
                    className={
                      order.orderStatus &&
                      String(order.orderStatus).includes("Delivered")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{paymentInfo && paymentInfo.orderStatus}</b>
                  </p>
                  <h4 className="my-4">Order Items:</h4>
                  <hr />
                  <div className="cart-item my-1">
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
                                      <th className="product-thumbnail">
                                        Image
                                      </th>
                                      <th className="product-name">Product</th>
                                      <th className="product-subtotal">
                                        Price
                                      </th>
                                      <th className="product-subtotal">
                                        Quantity
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {orderItems &&
                                      orderItems.map((item) => (
                                        <Fragment key={item.product}>
                                          <tr className="cart_item">
                                            <td
                                              className="product-thumbnail"
                                              data-title="Thumbnail"
                                            >
                                              <Link
                                                to={`/product/${item.product}`}
                                              >
                                                <img
                                                  src={`http://localhost:4000/products/${item.image}`}
                                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                                  alt=""
                                                />
                                              </Link>
                                            </td>

                                            <td
                                              className="product-name"
                                              data-title="Product"
                                            >
                                              <Link
                                                to={`/product/${item.product}`}
                                              >
                                                {item.name}
                                              </Link>
                                            </td>
                                            <td
                                              className="product-remove"
                                              data-title="Remove"
                                            >
                                              <p>{item.price} DT</p>
                                            </td>

                                            <td
                                              className="product-remove"
                                              data-title="Remove"
                                            >
                                              <p>{item.quantity} Item(s)</p>
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
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
