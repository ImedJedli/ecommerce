import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, deleteProductReview, getProductsReviews } from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";

function ProductReviews() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productId, setProductId] = useState("");

  const { error, reviews } = useSelector(state => state.productReviews);
  const { isDeleted } = useSelector((state) => state.review);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductsReviews(productId));
    }

    if (isDeleted) {
 alert.success('User deleted successfully');
     navigate('/admin/reviews');
     dispatch({ type: DELETE_REVIEW_RESET })
    }
  }, [dispatch, alert, error, productId,isDeleted, navigate]);

  const deleteReviewHandler = (id) => {
  dispatch(deleteProductReview(id,productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (productId !== "") {
      dispatch(getProductsReviews(productId));
    }
  };

  const setReviews = () => {
    const data = {
      columns: [
        { label: "Review ID", field: "id", sort: "asc" },
        { label: "Rating ", field: "rating", sort: "asc" },
        { label: "Comment", field: "comment", sort: "asc" },
        { label: "User", field: "user", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],

      rows: [],
    };

    if (reviews) {
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,

          actions: (
            <button className="btn btn-danger py-1 px-2 ml-2" 
            onClick={()=> deleteReviewHandler(review._id )}>
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <Infos title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="email_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

          {/*         <button
                    id="search_button"
                    type="button"
                    className="btn btn-primary btn-block py-2" 
                    onClick={submitHandler}
                  >
                    SEARCH
                  </button> */}
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
             
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
                  <p className="mt-5 text-center"> No Reviews</p>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductReviews;
