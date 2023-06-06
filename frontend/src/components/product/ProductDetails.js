import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams , useNavigate } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";
import {
  clearErrors,
  getSingleProduct,
  postReview,
} from "../../actions/productActions";
import { REVIEW_RESET } from "../../constants/productConstantes";
import Loader from "../layout/Loader";
import ListReviews from "../review/ListReviews";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const ProductDetails = ( {relatedProduct} ) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.postReview
  );

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.ProductDetails
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review posted successfully");
      dispatch({ type: REVIEW_RESET });
    }
  }, [dispatch, toast, error, reviewError, id, success]);

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    toast.success("Item added to cart ");
  };

  const increaseQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
      console.log('stock')
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`/api/v1/product/${id}`);
      const data = await response.json();
      setRelatedProducts(data.relatedProducts);
    } catch (error) {
      console.log('Error fetching related products:', error);
    }
  };
  
  

  const decreaseQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRating() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function(e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("white");
        }
      });
    }
  }

  const submitReview = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);
    dispatch(postReview(formData));
  };
 
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
    const navigate= useNavigate()
    const handleViewDetails = () => {
    const url = `/product/${relatedProduct._id}`;
    window.location.href = url;
    window.scrollTo(0, 0); // Scroll to the top of the page
    };

  
  return (
    <Fragment>
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="row f-flex justify-content-around">

            
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {product && product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                      
                        <img
                          className="d-block w-100 "
                          src={`http://localhost:4000/products/${image}`}
                          alt={image.title}
                          
                        />
                        
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>


              


              
              

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product Category: {product.category}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}% ` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr />

                <p id="product_price">{product.price}DT</p>
                <div className="stockCounter d-inline">
                  <span
                    className="btn btn-danger minus"
                    onClick={decreaseQuantity}
                  >
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span
                    className="btn btn-primary plus"
                    onClick={increaseQuantity}
                  >
                    +
                  </span>

                  <button
                    type="button"
                    id=""
                    className="btn btn-main btn-sm d-inline ml-4"
                    disabled={product.stock === 0}
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                <hr />

                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                </p>

                <hr />

                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>

                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={setUserRating}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>
                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button
                              onClick={submitReview}
                              className="btn my-3 float-right review-btn px-4 text-black"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </button>

                    
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav
              className="product-info-tabs wc-tabs mt-5 mb-5"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="nav nav-tabs nav-fill"
                id="nav-tab"
                role="tablist"
              >
                <a
                  className="nav-item nav-link active"
                  id="nav-description-tab"
                  data-toggle="tab"
                  href="#nav-description"
                  role="tab"
                  aria-controls="nav-description"
                  aria-selected="true"
                >
                  Description
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-reviews-tab"
                  data-toggle="tab"
                  href="#nav-reviews"
                  role="tab"
                  aria-controls="nav-reviews"
                  aria-selected="false"
                >
                  Reviews({product.reviews && product.reviews.length})
                </a>
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-description"
                role="tabpanel"
                aria-labelledby="nav-description-tab"
              >
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-additional-info"
                role="tabpanel"
                aria-labelledby="nav-additional-info-tab"
              ></div>
              <div
                className="tab-pane fade"
                id="nav-reviews"
                role="tabpanel"
                aria-labelledby="nav-reviews-tab"
              >
                {product.reviews && product.reviews.length > 0 && (
                  <ListReviews reviews={product.reviews} />
                )}
              </div>
            </div>

            
            {relatedProducts.length > 0 && (
 <div className="related-products">
        <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="title text-center">
            <h2 className="text-color">Related products</h2>

            <p>The best quality </p>
          </div>
        </div>
      </div>
            
  
<div className="row">
  {
    relatedProducts.map((relatedProduct) => (
      <div key={relatedProduct._id} className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
        <div className="product">
          <div className="product-wrap">
            <Link onClick={handleViewDetails}>
              <img
                className="img-fluid w-100 mb-3 img-first"
                src={`http://localhost:4000/products/${relatedProduct.images[0]}`}
                alt="product-img"
                style={{ objectFit: "cover", height: "200px" }}
              />
            </Link>
            <Link onClick={handleViewDetails}>
              <img
                className="img-fluid w-100 mb-3 img-second"
                src={`http://localhost:4000/products/${relatedProduct.images[1]}`}
                style={{ objectFit: "cover", height: "200px" }}
              />
            </Link>
          </div>

          <span className="onsale">{relatedProduct.seller}</span>
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
              <Link onClick={handleViewDetails}>
              
              {relatedProduct.name}</Link>
            </h2>
            <div className="rating mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(relatedProduct.ratings / 5) * 100}% ` }}
                ></div>
              </div>
              <span id="no_of_reviews"> {relatedProduct.numOfReviews} Reviews </span>
            </div>
            <span className="price">{relatedProduct.price} DT</span>
            <Link
             
              className="btn btn-main mt-3 btn-block"
              onClick={handleViewDetails}
            >
              View Details
            </Link>

            
          </div>
        </div>
      </div>
    ))}
</div>

</div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
