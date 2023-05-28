/* eslint-disable jsx-a11y/anchor-is-valid */
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { getProducts } from "../actions/productActions";
import Infos from "./layout/Infos";
import Loader from "./layout/Loader";
import Product from "./product/Product";

import { getAllCategories } from "../actions/categoryActions";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

  const dispatch = useDispatch();
  const {  categories } = useSelector((state) => state.allCategories);
  useEffect(() => {

    dispatch(getAllCategories());

  }, [dispatch]);




  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 9000]);
  const [rating, setRating] = useState(null);
  const [category, setCategory] = useState('');


const handleAllCategories = () => {
  setSelectedCategory("");
};
 
  const alert = useAlert();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  
  const { keyword } = useParams();

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
    
  }
  useEffect(() => {
   
    if (error) {
      return alert.show(error);
    }

    dispatch(getProducts(keyword, currentPage, price,category, rating));
    
  }, [dispatch, alert, error, keyword, currentPage,price,category, rating]);

  return (
    <Fragment>
      <div className="home-container ">
        
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Infos title={"Buy Best Products"} />
            <section className="page-home1 ">
                    <div className="overy"></div>   
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                        <div className="content text-center">
                        <div className="main-slider slider slick-initialized slick-slider">
                        <div className="slider-caption">
                       
                       <h1 className="mt-2 mb-5" >
                         <span className="text-color">Drop </span>Sell
                       </h1>
                      
                     </div>
                     </div>               
                
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            
            <section className="section products-main">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    
                    <div className="title text-center">
                      <h2 className="text-color">Our products</h2>
                      
                      <p>The best quality </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  
             {keyword ? (
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
                          {[5, 4, 3, 2, 1,0].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                                fontWeight: star === rating ? "bold" : "normal",
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

                     <hr></hr>

                   
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

                
              ) : (

                
                products  &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )} 

            </div>
              </div>

              <div className="col-6 col-md-3">
             {  <ul>
    <li
      key="all"
      onClick={() => setCategory("")}
      style={{
        cursor: "pointer",
        listStyleType: "none",
        fontWeight: selectedCategory === "" ? "bold" : "normal",
      }}
    >
      All Categories
    </li>
    {categories &&
      categories.map((category) => (
        <li
          key={category._id}
          onClick={() => setCategory(category.name)}
          style={{
            cursor: "pointer",
            listStyleType: "none",
            fontWeight: selectedCategory === category.name ? "bold" : "normal",
          }}
        >
          {category.name}
        </li>
      ))}
  </ul> }
  </div>
              
            </section>

            {resPerPage <= productsCount && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}    
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                  
                />
              </div>
            )}

<section className="page-home2">
                    <div className="overy"></div>   
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                        <div className="content text-center">
                        <div className="main-slider slider slick-initialized slick-slider">
                        <div className="slider-caption">
                       
                       <h1 className="mt-2 mb-5">
                         <span className="text-color">Drop </span>Sell
                       </h1>
                      
                     </div>
                     </div>               
                
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            <section className="section products-list"></section>
            <section className="features border-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="feature-block">
                      <i className="tf-ion-android-bicycle"></i>
                      <div className="content">
                        <h5>Free Shipping</h5>
                        <p>For orders over 300DT </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="feature-block">
                      <i className="tf-wallet"></i>
                      <div className="content">
                        <h5>30 Days Return</h5>
                        <p>Money back Guarantee</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="feature-block">
                      <i className="tf-key"></i>
                      <div className="content">
                        <h5>Secure Checkout</h5>
                        <p>100% Protected by paypal</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="feature-block">
                      <i className="tf-clock"></i>
                      <div className="content">
                        <h5>24/7 Support</h5>
                        <p>All time customer support </p>
                      </div>
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

export default Home;
