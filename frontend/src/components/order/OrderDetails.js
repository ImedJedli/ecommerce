import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";

const OrderDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector(state => state.orderDetails)
  

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
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error,id]);

  const shippingDetails =
    shippingInfo && `${shippingInfo.adress},${shippingInfo.city}`;

  return (
    <Fragment>
      <Infos title={"Order Details "} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order {order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}
              </p>
              <p className="mb-4">
                <b>Address:</b>{shippingDetails}
              </p>
              <p>
                <b>Amount:</b> {paymentInfo && paymentInfo.totalPrice} DT
              </p>

              <hr />

              <h4 className="my-4">Order Status:</h4>
              <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{paymentInfo && paymentInfo.orderStatus}</b></p>


              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="row my-5" key={item.product}>
                      <div className="col-4 col-lg-2">
                        <img src={`http://localhost:4000/products/${item.image}`} alt={item.name} height="45" width="65" />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.nLinkme}</Link>
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
