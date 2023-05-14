import axios from "axios";

import {
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  REVIEW_FAIL,
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS
} from "../constants/productConstantes";


export const getProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category="",
  rating = 0,
  
) => async (dispatch) => {
  try {
    console.log("Price in getProducts:", price); // Add this line

    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });

    let link = `http://localhost:4000/api/v1/products`;
  

    if (keyword) {
      
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}`;
      
    }

 
    if (currentPage) {
      link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}`;
    }

  

    
    if (price) {
      link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
      
    }

    if (category) {
      link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
  }

  

    /*----------------------*/
    if (rating) {
      link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
    }
  
    console.log("API link: ", link);
   

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: {
        products: data.products,
        productsCount: data.productsCount,
        resPerPage: data.resPerPage,
      },
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      //payload: error.response.data.message
      //? error.response.data.message
      //:error.message,
      payload: error.message,
    });
  }
};

/*export const getProducts = () => async (dispatch) =>{
      return (dispatch) => {
        axios.get('/api/v1/products')
          .then(response => {
            if (response && response.data) {
              dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                value: response.data
              });
            } else {
              console.error('Invalid response from server:', response);
            }
          })
          .catch(error => {
            console.error('Error getting products:', error);
          });
      };
    };
*/

export const postReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/v1/review", reviewData, config);
    dispatch({
      type: REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_FAIL,
      payload: error.message,
    });
  }
};

// ADMIN

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/v1/admin/products`
    );
    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const getProductsReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REVIEWS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/v1/admin/reviews?id=${id}`
    );
    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.message,
    });
  }
};


export const deleteProductReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/admin/reviews?id=${id}&productId=${productId}`
    );
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.message,
    });
  }
};



export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
