import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getSingleBlog,
  updateBlog,
} from "../../actions/blogActions";
import { UPDATE_BLOG_RESET } from "../../constants/blogConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const dispatch = useDispatch();
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.blog
  );
  const { error, blog } = useSelector((state) => state.blogDetails);

  const blogId = id;

  useEffect(() => {
    if (blog && blog._id !== blogId) {
      dispatch(getSingleBlog(blogId));
    } else {
      setTitle(blog.title);
      setDescription(blog.description);
      setOldImages(blog.images || []);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/blogs");
      toast.success("Blog updated successfully");
      dispatch({ type: UPDATE_BLOG_RESET });
    }
  }, [dispatch, toast, error, isUpdated, updateError, blog, blogId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateBlog(blog._id, formData));
  };

  const onChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setImages([...images, ...filesArray]);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreview((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  return (
    /* <Fragment>
      <Infos title={"Update product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
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
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={`http://localhost:4000/blogs/${img}`}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
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
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}; */

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
                        <h2 className="mb-2">Update Blog</h2>
                      </div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-outline mb-4">
                              <label
                                htmlFor="name_field"
                                className="form-label"
                              >
                                Title
                              </label>
                              <input
                                type="name"
                                id="name_field"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`form-control form-control-lg 
                              }`}
                                placeholder="Title"
                              />
                            </div>
                          </div>

                
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="#">Description</label>
                          <ReactQuill
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "100%" }}
                            className={`form-control border-0 
                      }`}
                            placeholder="Full description"
                          />
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
                          {oldImages &&
                            oldImages.map((img) => (
                              <img
                                key={img}
                                src={`http://localhost:4000/blogs/${img}`}
                                alt={img}
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
                            ))}
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
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Update blog
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

export default UpdateBlog;
