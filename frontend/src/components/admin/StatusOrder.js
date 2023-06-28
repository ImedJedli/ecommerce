import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstantes";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import GenerateInvoice from "./GenerateInvoice";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { affectUser } from "../../actions/orderActions";
import { allUsers, getUserDetails } from "../../actions/userAction";

function StatusOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [statusError, setStatusError] = useState("");

  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);
  const {  users } = useSelector((state) => state.allUsers);

  //const { user: deliverUser } = useSelector((state) => state.userDetails);
  //const { userDetails: deliverUser } = useSelector((state) => state.userDetails);
  const deliverUser = users.find((user) => user._id === deliverUserId);
  console.log("deliver",deliverUser)

  const [deliverUserId, setDeliverUserId] = useState("");

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  const orderId = id;
  const showDownloadButton =
  orderStatus === "Shipped" || orderStatus === "Delivered";

  useEffect(() => {
    dispatch(allUsers());
   // dispatch(getUserDetails(order.deliverUserId));
    dispatch(getUserDetails(deliverUserId));
    dispatch(getOrderDetails(orderId));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order has been shipped, and the email has been successfully sent to the customer ");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

  }, [dispatch, toast, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    setStatusError("");

    let isValid = true;
    if (!status.trim()) {
      setStatusError("Status is required");
      isValid = false;
    }
    console.log("Selected status:", status); // Add this line to check the value

    if (isValid) {
      const formData = new FormData();
      formData.set("orderStatus", status);

      dispatch(updateOrder(id, formData));
    }
  };

  const affectOrderHandler = (orderId) => {
    const formData = new FormData();
    formData.set("deliverUserId", deliverUserId);
    
    dispatch(affectUser(orderId, formData));
    toast.info("User affected successfully");
  };

  const shippingDetails =
    shippingInfo && `${shippingInfo.adress}, ${shippingInfo.city}`;

  return (
    <Fragment>
      <Infos title={`Order Status : ${order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

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

                  <p>
                  <b>Deliver name:</b> {users &&
                    users.map((user) => {
                      if (user._id === order.deliverUserId) {
                        return user.name;
                      }
                    })}
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

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className={`form-control  ${
                        statusError ? "is-invalid" : ""
                      }`}
                    >
                      <option value=""> Order status </option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button>



                  <h4 className="my-4">Delivers</h4>

                  <div className="form-group">
                  <select
                  className="form-control"
                  name="deliverUser"
                  value={deliverUserId}
                  onChange={(e) => setDeliverUserId(e.target.value)}
                >
                  <option value="">Select Deliver User</option>
                  {users &&
                    users
                      .filter((user) => user.role === "deliver")
                      .map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => affectOrderHandler(order._id)}
                    >
                    Affect deliver
                  </button>

                  {paymentInfo && (paymentInfo.orderStatus ==="Shipped" || paymentInfo && paymentInfo.orderStatus ==="Delivered" )&& (
                    <button className="btn btn-primary btn-block">
                      <PDFDownloadLink
                        document={<GenerateInvoice order={order} />}
                        fileName="order.pdf"
                      >
                        {({ loading }) =>
                          loading ? "Generating PDF..." : "Download Invoice"
                        }
                      </PDFDownloadLink>
                    </button>
                  )}
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}

export default StatusOrder;
