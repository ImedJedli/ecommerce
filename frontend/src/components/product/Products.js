import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProducts
} from "../../actions/productActions";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";

import Pagination from "react-js-pagination";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Product from "./Products.js";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function Products  () {


  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 9000]);
  const [rating, setRating] = useState();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    console.log("home price", price);
    console.log("home page", currentPage);
    if (error) {
      return alert.show(error);
    }

    dispatch(getProducts(keyword, currentPage, resPerPage, price, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, rating]);

  return (
    <Fragment>
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Infos title={"Buy Best Products"} />

            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h1>
                  <span className="text-danger">Our</span> Products
                </h1>
                <hr id="hrLigne"></hr>
              </div>
            </div>

            <section id="products" className="container">
              <div className="row">
                
                  <Fragment>
                    <div className="col-6 col-md-3">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `1DT`,
                            5000: `5000DT`,
                          }}
                          min={1}
                          max={5000}
                          defaultValue={[1, 5000]}
                          tipFormatter={(value) => `${value}DT`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => {
                            setPrice(price);
                          }}
                          style={{ height: "#49px" }}
                        />

                        <hr className="my-5" />

                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products &&
                          products.map((product) => (
                            <Product
                              key={product._id}
                              product={product}
                              col={4}
                            />
                          ))}
                      </div>
                    </div>
                  </Fragment>
                
                  {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                  }
              </div>
            </section>
            <br></br>
            <br></br>
            {resPerPage <= productsCount && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={(currentPage) => {
                    console.log(currentPage); // add this line to log the price state variable
                    setCurrentPage(currentPage);
                  }}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}

            <div></div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Products;
