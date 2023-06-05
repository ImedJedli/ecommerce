import React, { Fragment, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { getAdminProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../actions/orderActions";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";
import Infos from "../layout/Infos";
import { allUsers } from "../../actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCoins,
  faBoxOpen,
  faBlog,
  faUsers,
  
} from "@fortawesome/free-solid-svg-icons";
import {getAllCategories} from "../../actions/categoryActions" ;
import { getAllCoupons} from "../../actions/couponActions";
import { getAllBlogs} from "../../actions/blogActions";


const Dashboard = () => {


  const dispatch = useDispatch();


  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount, loading } = useSelector((state) => state.allOrders);
  const { categories} = useSelector((state) => state.allCategories);
  const { coupons} = useSelector((state) => state.allCoupons);
  const { blogs} = useSelector((state)=> state.allBlogs)

  const { users } = useSelector((state) => state.allUsers);

 const availablePro = products && products.filter(product => product.stock >0).length;
 const adminUsers = users && users.filter(user =>user.role ==="admin").length;
 const customerUsers = users && users.filter(user =>user.role ==="user").length;
 const processingOrders = orders && orders.filter(order =>order && order.paymentInfo.orderStatus === "Processing").length;
 const shippedOrders = orders && orders.filter(order =>order && order.paymentInfo.orderStatus === "Shipped").length;
 const deliveredOrders = orders && orders.filter(order =>order && order.paymentInfo.orderStatus === "Delivered").length;


  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
    dispatch(getAllCategories());
    dispatch(getAllCoupons());
    dispatch(getAllBlogs())
  }, [dispatch]);



  return (
    <Fragment>
    
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="container">
          <h1 className="my-4">Dashboard</h1>

          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <Infos title={"Admin dashboard"} />

              <div className="row pr-4">
              <div className="col-xl-12 col-sm-6 mb-3">
              <div className="card text-white bg-c-blue o-hidden h-100">
                    <div className="card-body ">
                      <div className="text-center card-font-size">
                        Total Income
                        <br /> {totalAmount} DT<b></b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4  mt-5">
              <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card bg-c-green order-card ">
                    <div className="card-body gr-1">
                      <h6 className="m-b-20 text-center">Orders</h6>
                      <h2 className="text-right">
                      <FontAwesomeIcon
                      icon={faBagShopping}
                      className="f-left" 
                      style={{ fontSize: "20px" }}
                    />
                        <span>{orders && orders.length}</span>
                      </h2>
                      <hr></hr>
                      <p className="m-b-0" style={{color: "white" }}>
                        Delivered Orders<span className="f-right">{deliveredOrders}</span>
                      </p>
                      <p className="m-b-0" style={{color: "white" }}>
                        Shipped Orders<span className="f-right">{shippedOrders}</span>
                      </p>
                      <p className="m-b-0" style={{color: "white" }}>
                        Processing Orders<span className="f-right">{processingOrders}</span>
                      </p>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-4 col-sm-6 mb-3">
                  <div className="card bg-c-green order-card">
                    <div className="card-body g">
                    <h6 className="m-b-20 text-center">Products</h6>
                    <h2 className="text-right">
                    <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="f-left" 
                    style={{ fontSize: "20px" }}
                  />
                      <span>{products && products.length}</span>
                    </h2>
                    <hr></hr>
                    <p className="m-b-0" style={{color: "white" }}>
                      On Stock
                      <span className="f-right">{availablePro}</span>
                    </p>
                    <p className="m-b-0" style={{color: "white" }}>
                      Out of Stock<span className="f-right">{outOfStock}</span>
                    </p>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/products"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6 mb-3">
                  <div className="card bg-c-green order-card">
                    <div className="card-body g">
                      <h6 className="m-b-20 text-center">Users</h6>
                      <h2 className="text-right">
                      <FontAwesomeIcon
                      icon={faUsers}
                      className="f-left"
                      style={{ fontSize: "20px" }}
                    />
                        <span>{users && users.length}</span>
                      </h2>
                      <hr></hr>
                      <p className="m-b-0" style={{color: "white" }}>
                        Admin Users<span className="f-right">{adminUsers}</span>
                      </p>
                      <p className="m-b-0" style={{color: "white" }}>
                        Customer Users<span className="f-right">{customerUsers}</span>
                      </p>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

              

              

              
            </div>

        <div className="row pr-4 mt-5">

        <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card bg-c-pink order-card">
                  <div className="card-body g">
                    <h6 className="m-b-20 text-center">Categories</h6>
                    <h2 className="text-right">
                    <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="f-left" 
                    style={{ fontSize: "20px" }}
                  />
                      <span>{categories && categories.length}</span>
                    </h2>
                    
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/categories"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            <div className="col-xl-4 col-sm-6 mb-3">
            <div className="card bg-c-pink order-card">
                  <div className="card-body g">
                    <h6 className="m-b-20 text-center">Blogs</h6>
                    <h2 className="text-right">
                    <FontAwesomeIcon
                    icon={faBlog}
                    className="f-left"
                    style={{ fontSize: "20px" }}
                  />
                      <span>{blogs && blogs.length}</span>
                    </h2>
                    
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/blogs"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                

                <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card bg-c-pink order-card">
                  <div className="card-body g">
                    <h6 className="m-b-20 text-center">Coupons</h6>
                    <h2 className="text-right">
                      <FontAwesomeIcon
                        icon={faCoins}
                        className="f-left"
                        style={{ fontSize: "20px" }}
                      />
                      <span>{coupons && coupons.length}</span>
                    </h2>
                    
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/coupons"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
                
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
  };
  
  export default Dashboard;
  

