import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteCoupon, getAllCoupons} from "../../actions/couponActions";
import { DELETE_COUPON_RESET } from "../../constants/couponConstantes";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

const CouponsList = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, coupons } = useSelector(
    (state) => state.allCoupons
  );

  const { error : deleteError, isDeleted} = useSelector(state => state.coupon)


  useEffect(() => {
    dispatch(getAllCoupons());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success('coupon deleted');
      dispatch({type: DELETE_COUPON_RESET});
      navigate("/admin/coupons");
    }

  }, [dispatch, alert, error, deleteError, isDeleted,navigate]);

  const deleteCouponHandler =(id) =>{
    dispatch(deleteCoupon(id))
}

  const setCoupons = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Code", field: "code", sort: "asc" },
        { label: "Discount", field: "discount", sort: "asc" },
        { label: "UsageLimit", field: "usageLimit", sort: "asc" },
        { label: "UsedCount", field: "usedCount", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    if (coupons) {
      coupons.forEach((coupon) => {
        data.rows.push({
          id: coupon._id,
          code: coupon.code,
          discount: coupon.discount,
          usageLimit: coupon.usageLimit,
          usedCount: coupon.usedCount,
          actions: (
            <Fragment>
              <Link
                to={`/coupon/${coupon._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button
                className="btn btn-danger py-1 px-2 ml-2"
               
              >
                <i className="fa fa-trash" onClick={() => deleteCouponHandler(coupon._id)}></i>
              </button>
            </Fragment>
          ),
        });
      });
    }
    return data;

  };

  return (

      <Fragment>
      <Infos title={"All Categories"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5"> All coupons</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCoupons()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>

  )
  
};

export default CouponsList;
