
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { allUsersReducer, authReducer, forgotPasswordReducer, userReducer } from './reducers/userReducers';

import { blogDetailsReducer, blogReducer, blogsReducer, newBlogReducer } from './reducers/blogReducer';
import { cartReducer } from './reducers/cartReducer';
import { allCategoriesReducer, categoryDetailsReducer, categoryReducer, createCategoryReducer } from './reducers/categoryReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';
import { newProductReducer, postReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { userDetailsReducer } from './reducers/userReducers';
import { allCouponsReducer, couponReducer, createCouponReducer } from './reducers/couponReducer';


const reducer = combineReducers({
      products: productsReducer,
      ProductDetails: productDetailsReducer,
      auth: authReducer,
      user: userReducer,
      forgotPassword : forgotPasswordReducer,
      cart : cartReducer,
      newOrder : newOrderReducer,
      myOrders : myOrdersReducer,
      orderDetails : orderDetailsReducer,
      postReview: postReviewReducer,
      newProduct : newProductReducer,
      product :productReducer,
      allOrders : allOrdersReducer,
      order : orderReducer,
      allUsers : allUsersReducer,
      userDetails : userDetailsReducer,
      productReviews : productReviewsReducer,
      review: reviewReducer,
      newCategory : createCategoryReducer,
      allCategories : allCategoriesReducer,
      categoryDetails : categoryDetailsReducer,
      category : categoryReducer,
      allBlogs : blogsReducer,
      blogDetails : blogDetailsReducer,
      blog : blogReducer,
      newBlog : newBlogReducer,

      coupon : couponReducer,
      newCoupon: createCouponReducer,
      allCoupons : allCouponsReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const shippingInfoStorage = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : { address: '', city: '', phoneNumber: '' };
const paymentInfoStorage = localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : { shippingPrice: '', totalPrice: '' };


const initialState = {
  cart: {
    cartItems: cartItemsFromStorage , 
    shippingInfo: shippingInfoStorage,
    paymentInfo:paymentInfoStorage
    
  }
};


const middlware =[thunk];
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(
      ...middlware ))) 

export default store;      