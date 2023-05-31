import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, myOrders } from "../../actions/orderActions";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error]);

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Order ID", field: "id", sort: "asc" },
        { label: "Num of Items", field: "numOfItems", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],

      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${order.paymentInfo.totalPrice} DT`,
        status:
          order.paymentInfo.orderStatus &&
          String(order.paymentInfo.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.paymentInfo.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.paymentInfo.orderStatus}</p>
          ),

        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <Infos title={"My Orders "} />
      <h1 className="mt-5">My orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default ListOrders;
