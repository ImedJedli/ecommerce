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
    name: "",
    description: "",
  });

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  //const { name } = category;

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector((state) => state.newCategory);
  useEffect(() => {
    if (error) {
      alert.error(error);
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
    setDescriptionError("");

    let isValid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    dispatch(addCategory(formData));
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
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

                        <div className="form-group mb-4">
                          <label htmlFor="#">Description</label>
                          <ReactQuill
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "100%" }}
                            className={`form-control border-0 ${
                              descriptionError ? "is-invalid" : ""
                            }`}
                            placeholder="Full description"
                          />
                          {descriptionError && (
                            <div className="invalid-feedback">{descriptionError}</div>
                          )}
                          
                        </div>
      
                        <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
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