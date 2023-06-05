import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faBold,
  faClipboard,
  faPlus,
  faProductHunt,
  faShoppingBasket,
  faUsers,
  faStar,
  faBlog,
  faRightToBracket,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Sidebar = () => {
  const handleHomeClick = () => {
    window.location.reload();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

 

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <Link to="/dashboard">
                <i className="fa fa-tachometer"></i> Dashboard
              </Link>
            </li>

            <li>
              <a
                href="#loginSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <i className="fa fa-user"></i> {user && user.name}
              </a>

              <ul className="collapse list-unstyled" id="loginSubmenu">
                <li>
                  <Link to="/admin/me" >
                    {" "}
                    <FontAwesomeIcon icon={faIdCard}/> Profile
                  </Link>
                </li>
              </ul>

              <ul className="collapse list-unstyled" id="loginSubmenu">
                <li>
                  <Link to="/" onClick={logoutHandler}>
                    {" "}
                   <FontAwesomeIcon icon={faRightToBracket}/> Logout
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#blogSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <FontAwesomeIcon icon={faBlog} /> Blogs
              </a>

              <ul className="collapse list-unstyled" id="blogSubmenu">
                <li>
                  <Link to="/admin/blogs">
                    <i className="fa fa-clipboard"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/blog/new">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#couponsSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <FontAwesomeIcon icon={faCoins} /> Coupons
              </a>
              <ul className="collapse list-unstyled" id="couponsSubmenu">
                <li>
                  <Link to="/admin/coupons">
                    <i className="fa fa-clipboard"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/coupon/new">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#categoriesSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Categories
              </a>
              <ul className="collapse list-unstyled" id="categoriesSubmenu">
                <li>
                  <Link to="/admin/categories">
                    <i className="fa fa-clipboard"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/category">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#productSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Products
              </a>
              <ul className="collapse list-unstyled" id="productSubmenu">
                <li>
                  <Link to="/admin/products">
                    <i className="fa fa-clipboard"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/product/new">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/admin/orders">
                <i className="fa fa-shopping-basket"></i> Orders
              </Link>
            </li>

            <li>
              <Link to="/admin/users">
                <i className="fa fa-users"></i> Users
              </Link>
            </li>

            <li>
              <Link to="/admin/reviews">
                <i className="fa fa-star"></i> Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
