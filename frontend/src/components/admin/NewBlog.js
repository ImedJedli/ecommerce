import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, newBlog } from "../../actions/blogActions";
import { NEW_BLOG_RESET } from "../../constants/blogConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewBlog = () => {
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newBlog);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  useEffect(() => {
    if (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/blogs");
      toast.success("Blog created successfully");
      dispatch({ type: NEW_BLOG_RESET });
    }
  }, [dispatch, toast, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTitleError("");
    setDescriptionError("");

    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newBlog(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      setImagesPreview((oldArray) => [...oldArray, URL.createObjectURL(file)]);
      setImages((oldArray) => [...oldArray, file]);
    });
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
                        <h2 className="mb-2">Create blog</h2>
                      </div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <div className="form-group mb-4">
                          <label htmlFor="title_field">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`form-control ${
                              titleError ? "is-invalid" : ""
                            }`}
                            placeholder="Title address"
                          />
                          {titleError && (
                            <div className="invalid-feedback">{titleError}</div>
                          )}
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="#">Description</label>
                          <ReactQuill
                            value={description}
                            onChange={handleDescriptionChange}
                            className={`form-control ${
                              descriptionError ? "is-invalid" : ""
                            }`}
                            placeholder="Full description"
                            style={{ height: "100%" }}
                          />
                          {descriptionError && (
                            <div className="invalid-feedback">
                              {descriptionError}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Images</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="product_images"
                              className="custom-file-input"
                              id="customFile"
                              onChange={onChange}
                              multiple
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose Images
                            </label>
                          </div>
                          {imagesPreview.map((img) => (
                            <img
                              src={img}
                              key={img}
                              alt="Images Preview"
                              className="mt-3 mr-2"
                              width="55"
                              height="52"
                            />
                          ))}
                        </div>

                        <button
                          id="login_button"
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                          disabled={loading ? true : false}
                        >
                          CREATE
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

export default NewBlog;
