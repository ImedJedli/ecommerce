import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteCategory, getAllCategories } from "../../actions/categoryActions";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstantes";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

const CategoriesList = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, categories } = useSelector(
    (state) => state.allCategories
  );

  const { error : deleteError, isDeleted} = useSelector(state => state.category)


  useEffect(() => {
    dispatch(getAllCategories());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success('category deleted');
      dispatch({type: DELETE_CATEGORY_RESET});
      navigate("/categories");
    }

  }, [dispatch, alert, error, deleteError, isDeleted,navigate]);

  /* const deleteCategoryHandler =(id) =>{
    dispatch(deleteCategory(id))
} */

const deleteCategoryHandler = (id) => {
  if (window.confirm("Are you sure you want to delete this category?")) {
    dispatch(deleteCategory(id));
  }
};

  const setCategories = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Products", field: "products", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    if (categories) {
      categories.forEach((category) => {
        
        data.rows.push({
          id: category._id,
          name: category.name,
          products: category.products.length,
          actions: (
            <Fragment>

            <Link
                to={`/categorie/${category._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>

              <Link
                to={`/category/${category._id}`}
                className="btn btn-primary py-1 px-2 ml-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button
                className="btn btn-danger py-1 px-2 ml-2"
               
              >
                <i className="fa fa-trash" onClick={() => deleteCategoryHandler(category._id)}></i>
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
            <h1 className="my-5"> All categories</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCategories()}
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

export default CategoriesList;
