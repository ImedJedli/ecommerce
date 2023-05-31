import {
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  CREATE_COUPON_FAIL,
  CREATE_COUPON_RESET,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  ALL_COUPON_FAIL,
  ALL_COUPON_RESET,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
  UPDATE_COUPON_REQUEST,
  UPDATE_COUPON_SUCCESS,
  UPDATE_COUPON_FAIL,
  UPDATE_COUPON_RESET,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  DELETE_COUPON_RESET,
  CLEAR_ERRORS,
} from "../constants/couponConstantes";

export const createCouponReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case CREATE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        coupon: action.payload,
      };

    case CREATE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COUPON_RESET:
      return { ...state, success: true };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const allCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case ALL_COUPON_REQUEST:
      return {
        loading: true,
        coupons: [],
      };

    case ALL_COUPON_SUCCESS:
      return {
        loading: false,
        coupons: action.payload,
      };

    case ALL_COUPON_FAIL:
      return {
        loading: false,

        error: action.payload,
      };
    default:
      return state;
  }
};

export const couponDetailsReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case COUPON_DETAILS_REQUEST:
      return { ...state, loading: true };

    case COUPON_DETAILS_SUCCESS:
      return { loading: false, coupon: action.payload };

    case COUPON_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COUPON_REQUEST:
    case DELETE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_COUPON_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_COUPON_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_COUPON_FAIL:
    case DELETE_COUPON_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
