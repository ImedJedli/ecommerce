import {
  PDFDownloadLink
} from "@react-pdf/renderer";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
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
import { sendInvoiceByEmail } from "./SendInvoiceByEmail";
import Sidebar from "./Sidebar";

function StatusOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [statusError, setStatusError] = useState("");

  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  const orderId = id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order updated succesfuly");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

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

  const shippingDetails =
    shippingInfo && `${shippingInfo.adress}, ${shippingInfo.city}`;

  const sendInvoice = async () => {
    try {
      const response = await sendInvoiceByEmail(orderId, user.email);
      // Handle the response, display a success message or handle any errors
      alert.success("Invoice sent successfully");
    } catch (error) {
      alert.error("Failed to send invoice");
    }
  };

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
                    <b>Shipping:</b> {paymentInfo && paymentInfo.shippingPrice} DT
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
                    {orderItems &&
                      orderItems.map((item) => (
                        <div className="row my-5" key={item.product}>
                          <div className="col-4 col-lg-2">
                            <img
                              src={`http://localhost:4000/products/${item.image}`}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.product}`}>
                              {item.nLinkme}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>{item.price} DT</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Item(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
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
                      <option value=""> Choose category </option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button>


                 <button  className="btn btn-primary btn-block">   
                  <PDFDownloadLink
                    document={<GenerateInvoice order={order} />}
                    fileName="order.pdf"
                  >
                    {({ loading }) =>
                      loading ? "Generating PDF..." : "Download Invoice"
                    }
                  </PDFDownloadLink>
                  </button>    
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
