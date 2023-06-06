import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryActions";
import {
  clearErrors,
  getSingleProduct,
  updateProduct,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { categories } = useSelector((state) => state.allCategories);

  useEffect(() => {
    console.log("Dispatching getAllCategories action");

    dispatch(getAllCategories());
    console.log("Categories:", categories); // Add this line
  }, [dispatch]);

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const dispatch = useDispatch();
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );
  const { error, product } = useSelector((state) => state.ProductDetails);

  const productId = id;

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getSingleProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
   
    setOldImages(product.images || [])

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
      navigate("/admin/products");
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, toast, error, isUpdated, updateError, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

 
    
      images.forEach((image) => {
        formData.append("images", image);
      });
    

    dispatch(updateProduct(product._id, formData));
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
                        <h2 className="mb-2">Update product</h2>
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
                                className={`form-control form-control-lg 
                              }`}
                                placeholder="Name"
                              />
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
                                className={`form-control form-control-lg 
                              }`}
                                placeholder="Seller"
                              />
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
                                className={`form-control form-control-lg 
                              }`}
                              />
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
                                className={`form-control form-control-lg 
                              }`}
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
                              className={`form-control form-control-lg 
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
                          {oldImages &&
                            oldImages.map((img) => (
                              <img
                                key={img}
                                src={`http://localhost:4000/products/${img}`}
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
                          Update product
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

export default UpdateProduct;
