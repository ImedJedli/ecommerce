import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { logout } from "../../actions/userAction";
import {  toast } from 'react-toastify';

import "../../App.css";

const Header =() => {

  const handleHomeClick = () => {
    window.location.reload();
  };

  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  const [wishlistCount, setWishlistCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    // Load the saved products from the local storage
    const savedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(savedProducts.length);
  }, []);

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation "
        id="navbar"
      >
        <div className="container">
          <Link className="navbar-brand font-weight-bold" to={{ pathname: "/", state: { page: 1 } }}>
            DropSell
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-controls="main-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="main-navbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={{ pathname: "/" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>

              <li className="nav-item dropdown dropdown-slide">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown4"
                  role="button"
                  data-delay="350"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Pages.
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                  <li>
                    <a href="/blogs">Blog</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown dropdown-slide">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown3"
                  role="button"
                  data-delay="350"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop.
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                  <li>
                    <Link to={{ pathname: "/" }}>Products</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "/cart" }}>Cart</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown dropdown-slide">
                {user ? (
                  <div className="ml-4 dropdown d-inline">
                    <Link
                      to="#!"
                      className="btn dropdown-toggle text-white mr-4"
                      type="button"
                      id="dropDownMenuButton"
                      data-toggle="dropdown"
                      arial-haspopup="true"
                      aria-expanded="false"
                    >
                      <figure className="avatar avatar-nav">
                        <img
                          src={`http://localhost:4000/avatars/${user.avatar}`}
                          alt={user && user.name}
                          className="rounded-circle"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </figure>

                      <span style={{ color: "black" }}>
                        {" "}
                        {user && user.name}
                      </span>
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropDownMenuButton"
                    >
                      {user && user.role === "admin" && (
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      )}

                      <Link className="dropdown-item" to="/orders/me">
                        Orders
                      </Link>

                      <Link className="dropdown-item" to="/me">
                        Profil
                      </Link>

                      <Link
                        className="dropdown-item text-danger"
                        to="/"
                        onClick={logoutHandler}
                      >

                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  !loading && (
                    <Link
                      to="/login"
                      className="nav-link dropdown-toggle"
                     
                      id="navbarDropdown5"
                      role="button"
                      data-delay="350"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Account.
                    </Link>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block"></div>
          <div className="col-lg-6 col-6 text-left">
            <Search />
          </div>
          <div className="col-lg-3 col-6 text-right cart-icon-container">
            <Link to="/cart" className="btn ">
              <i className="tf-ion-android-cart"></i>
              <span className="badge">{cartItems.length}</span>
            </Link>

            <Link to="/wishlist" className="btn ">
              <i className="fa fa-heart"></i>
              <span className="badge">{wishlistCount}</span>
            </Link>

           
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
