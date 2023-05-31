import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategory, clearErrors } from "../../actions/categoryActions";
import {
  CREATE_CATEGORY_RESET
} from "../../constants/categoryConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: ""
  });

  const [name, setName] = useState("");



  //const { name } = category;

  const [nameError, setNameError] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector((state) => state.newCategory);
  const { categories } = useSelector((state) => state.allCategories); // Access the categories array from Redux state


  useEffect(() => {
    if (error) {
      if (error.response && error.response.data.message) {
        alert.error(error.response.data.message);
      } else {
        alert.error(error);
      }
      dispatch(clearErrors());
    }
      
    

    if (success) {
      dispatch({ type: CREATE_CATEGORY_RESET });
      alert.success("category created successfully");
      navigate("/categories");
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    setNameError("");

    let isValid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    const formData = new FormData();
    formData.set("name", name);
    dispatch(addCategory(formData));
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };


  return (
    <Fragment>
      <Infos title="create blog" />
      <div className="row">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="signUp-container">
            <div className="account section">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="login-form border p-5">
                      <div className="text-center heading">
                        <h2 className="mb-2">Create categorie</h2>
                      </div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <div className="form-group mb-4">
                          <label htmlFor="name_field">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`form-control ${
                              nameError ? "is-invalid" : ""
                            }`}
                            placeholder="Name"
                          />
                          {nameError && (
                            <div className="invalid-feedback">{nameError}</div>
                          )}
                        </div>
      
                        <button
              id="register_button"
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              disabled={loading ? true : false}
            >
              Create
            </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  );
};

export default CreateCategory;
