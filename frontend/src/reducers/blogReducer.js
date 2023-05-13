import { ALL_BLOGS_REQUEST ,
ALL_BLOGS_SUCCESS,
ALL_BLOGS_FAIL,
CLEAR_ERRORS,
BLOG_DETAILS_REQUEST,
BLOG_DETAILS_SUCCESS,
BLOG_DETAILS_FAIL,
UPDATE_BLOG_REQUEST,
UPDATE_BLOG_SUCCESS,
UPDATE_BLOG_FAIL,
UPDATE_BLOG_RESET,
DELETE_BLOG_REQUEST,
DELETE_BLOG_SUCCESS,
DELETE_BLOG_FAIL,
DELETE_BLOG_RESET ,
ADMIN_BLOGS_REQUEST,
ADMIN_BLOGS_SUCCESS,
ADMIN_BLOGS_FAIL,
NEW_BLOG_REQUEST,
NEW_BLOG_SUCCESS,
NEW_BLOG_RESET,
NEW_BLOG_FAIL} from "../constants/blogConstantes";

export const blogsReducer = (state = { blogs: [] }, action) => {

      switch (action.type) {
        case ALL_BLOGS_REQUEST:
          case ADMIN_BLOGS_REQUEST:
          return { loading: true, blogs: [] };
    
        case ALL_BLOGS_SUCCESS:
          return {
            loading: false,
            blogs: action.payload.blogs,
            blogsCount: action.payload.blogsCount,
            resPerPage: action.payload.resPerPage,
            
          };

      case ADMIN_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };
    
        case ALL_BLOGS_FAIL:
          case ADMIN_BLOGS_FAIL:
          return { loading: false, error: action.payload };
    
        case CLEAR_ERRORS:
          return { ...state, error: null };
    
        default:
          return state;
      }
    };

    export const blogDetailsReducer = (state = { blog: [] }, action) => {
      switch (action.type) {
        case BLOG_DETAILS_REQUEST:
          return { ...state, loading: true };
    
        case BLOG_DETAILS_SUCCESS:
          console.log("action",action.payload); // Add this line  ok
          return { loading: false, blog: action.payload };
    
        case BLOG_DETAILS_FAIL:
          return { ...state, error: action.payload };
    
        case CLEAR_ERRORS:
          return { ...state, error: null };
    
        default:
          return state;
      }
    };


    export const blogReducer = (state = {}, action) => {
      switch (action.type) {
        case UPDATE_BLOG_REQUEST:
        case DELETE_BLOG_REQUEST:
          return {
            ...state,
            loading: true,
          };
    
        case UPDATE_BLOG_SUCCESS:
          return {
            ...state,
            loading: false,
            isUpdated: action.payload,
          };
    
        case DELETE_BLOG_SUCCESS:
          return {
            ...state,
            loading: false,
            isDeleted: action.payload,
          };

        case UPDATE_BLOG_RESET:
          return {
            ...state,
            isUpdated: false,
          };
    
        case DELETE_BLOG_RESET:
          return {
            ...state,
            isUpdated: false,
          };
    
        case UPDATE_BLOG_FAIL:
        case DELETE_BLOG_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    
        case CLEAR_ERRORS:
          return { ...state, error: null };
    
        default:
          return state;
      }
    };  
    
    
    export const newBlogReducer = (state = { blog: {} }, action) => {
      switch (action.type) {
        case NEW_BLOG_REQUEST:
          return { ...state, loading: true };
    
        case NEW_BLOG_SUCCESS:
          return {
            loading: false,
            success: action.payload.success,
            blog: action.payload.blog,
          };
    
        case NEW_BLOG_RESET:
          return { ...state, success: false };
    
        case NEW_BLOG_FAIL:
          return { ...state, error: action.payload };
    
        case CLEAR_ERRORS:
          return { ...state, error: null };
    
        default:
          return state;
      }
    };