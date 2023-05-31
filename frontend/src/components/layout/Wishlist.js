import React, { Fragment, useEffect, useState } from "react";
import Infos from "../layout/Infos";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];
    setSavedProducts(savedProducts);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = savedProducts.filter(
      (product) => product._id !== productId
    );
    setSavedProducts(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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
        {savedProducts.length === 0 ? (
          <h2 className="mt-5 text-center">
            No products saved in the wishlist yet!
          </h2>
        ) : (
          <Fragment>
            <h2 className="mt-5 text-center">
              {" "}
              Wishlist: <b>{savedProducts.length} items</b>
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
                              <th className="product-thumbnail">Image</th>
                              <th className="product-name">Product</th>
                              <th className="product-subtotal">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {savedProducts.map((product) => (
                              <Fragment key={product._id}>
                                <tr className="cart_item">
                                  <td
                                    className="product-thumbnail"
                                    data-title="Thumbnail"
                                  >
                                    <Link to={`/product/${product._id}`}>
                                      <img
                                        src={`http://localhost:4000/products/${product.images[0]}`}
                                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                        alt=""
                                      />
                                    </Link>
                                  </td>

                                  <td
                                    className="product-name"
                                    data-title="Product"
                                  >
                                    <Link to={`/product/${product._id}`}>
                                      {product.name}
                                    </Link>
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
                                      onClick={() =>
                                        removeFromWishlist(product._id)
                                      }
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
              </div>
            </section>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Wishlist;
