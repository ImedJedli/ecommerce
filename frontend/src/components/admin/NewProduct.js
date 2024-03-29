import React, { Fragment, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryActions";
import { clearErrors, newProduct } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const NewProduct = () => {
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const { categories } = useSelector((state) => state.allCategories);

  useEffect(() => {
    console.log("Dispatching getAllCategories action");

    dispatch(getAllCategories());
    console.log("Categories:", categories); // Add this line
  }, [dispatch]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      toast.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, toast, error, success]);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [stockError, setStockError] = useState("");
  const [sellerError, setSellerError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setNameError("");
    setPriceError("");
    setCategoryError("");
    setDescriptionError("");
    setStockError("");
    setSellerError("");

    let isValid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!price) {
      setPriceError("Price is required");
      isValid = false;
    }
    if (!category) {
      setCategoryError("Category is required");
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }
    if (!stock) {
      setStockError("Stock is required");
      isValid = false;
    }
    if (!seller.trim()) {
      setSellerError("Seller is required");
      isValid = false;
    }

    if (isValid) {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("price", price);
      formData.set("category", category);
      formData.set("description", description);
      formData.set("stock", stock);
      formData.set("seller", seller);

      images.forEach((image) => {
        formData.append("images", image);
      });

      dispatch(newProduct(formData));
    }
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

  console.log(categories);

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
                        <h2 className="mb-2">Create product</h2>
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
                                Name
                              </label>
                              <input
                                type="name"
                                id="name_field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`form-control form-control-lg ${
                                  nameError ? "is-invalid" : ""
                                }`}
                                placeholder="Name"
                              />
                              {nameError && (
                                <div className="invalid-feedback">
                                  {nameError}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-outline mb-4">
                              <label
                                htmlFor="seller_field"
                                className="form-label"
                              >
                                Seller
                              </label>
                              <input
                                id="seller_field"
                                type="text"
                                value={seller}
                                onChange={(e) => setSeller(e.target.value)}
                                className={`form-control form-control-lg ${
                                  sellerError ? "is-invalid" : ""
                                }`}
                                placeholder="Seller"
                              />
                              {sellerError && (
                                <div className="invalid-feedback">
                                  {sellerError}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-outline mb-4">
                              <label
                                htmlFor="price_field"
                                className="form-label"
                              >
                                Price
                              </label>
                              <input
                                type="price"
                                id="price_field"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className={`form-control form-control-lg ${
                                  priceError ? "is-invalid" : ""
                                }`}
                              />
                              {priceError && (
                                <div className="invalid-feedback">
                                  {priceError}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-outline mb-4">
                              <label
                                htmlFor="stock_field"
                                className="form-label"
                              >
                                Stock
                              </label>
                              <input
                                id="stock_field"
                                type="text"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className={`form-control form-control-lg ${
                                  sellerError ? "is-invalid" : ""
                                }`}
                              />
                              {stockError && (
                                <div className="invalid-feedback">
                                  {stockError}
                                </div>
                              )}
                            </div>
                          </div>
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
                            <div className="invalid-feedback">
                              {descriptionError}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <div className="form-outline mb-4">
                            <label
                              htmlFor="category_field"
                              className="form-label"
                            >
                              Category
                            </label>
                            <select
                              id="category_field"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className={`form-control form-control-lg ${
                                categoryError ? "is-invalid" : ""
                              }`}
                            >
                              <option value=""> Choose category </option>
                              {categories.length > 0 &&
                                categories.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category.name}
                                  >
                                    {category.name}
                                  </option>
                                ))}
                            </select>
                          </div>
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
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Add product
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

export default NewProduct;
