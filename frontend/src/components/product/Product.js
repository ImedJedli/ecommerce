import React, { useState } from "react";
import { Link } from "react-router-dom";

function product({ product, col }) {
  const [isSaved, setIsSaved] = useState(false);
  

  const handleSaveToWishlist = () => {
    setIsSaved(!isSaved);

    const savedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductSaved = savedProducts.some((p) => p._id === product._id);
    if (isProductSaved) {
      return;
    }
    if (isSaved) {
      const updatedWishlist = savedProducts.filter(
        (p) => p._id !== product._id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      savedProducts.push(product);
      localStorage.setItem("wishlist", JSON.stringify(savedProducts));
    }
  };

  return (
    <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
      <div className="product">
        <div className="product-wrap">
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid w-100 mb-3 img-first"
              src={`http://localhost:4000/products/${product.images[0]}`}
              alt="product-img"
              style={{ objectFit: "cover", height: "200px" }}
            />
          </Link>
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid w-100 mb-3 img-second"
              src={`http://localhost:4000/products/${product.images[1]}`}
              style={{ objectFit: "cover", height: "200px" }}
            />
          </Link>
        </div>

        <span className="onsale">{product.seller}</span>
        <div className="product-hover-overlay">
          <a href="/" onClick={handleSaveToWishlist}>
            {isSaved ? (
              <i className="tf-ion-ios-heart"></i>
            ) : (
              <i className="tf-ion-ios-heart-outline"></i>
            )}
          </a>
        </div>
        <div className="product-info">
          <h2 className="product-title h5 mb-0">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h2>
          <div className="rating mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}% ` }}
              ></div>
            </div>
            <span id="no_of_reviews"> {product.numOfReviews} Reviews </span>
          </div>
          <span className="price">{product.price} DT</span>
          <Link
            to={`/product/${product._id}`}
            id=""
            className="btn btn-main mt-3 btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default product;
