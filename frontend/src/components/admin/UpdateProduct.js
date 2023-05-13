import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryActions";
import { clearErrors, getSingleProduct, updateProduct } from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";


const UpdateProduct =() => {

  const {  categories } = useSelector((state) => state.allCategories);

  useEffect(() => {
    console.log("Dispatching getAllCategories action");

    dispatch(getAllCategories());
    console.log("Categories:", categories); // Add this line

  }, [dispatch]);

    const  {id}  = useParams();
    const navigate= useNavigate()

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages,setOldImages] = useState([])

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
  const {error, product } = useSelector((state) => state.ProductDetails);

  const productId = id;

  useEffect(() => {

      if(product && product._id !== productId){
            dispatch(getSingleProduct(productId))
      } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock);
            setOldImages(product.images)
      }

      if (error) {
          alert.error(error);
          dispatch(clearErrors())
      }

      if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

      if (isUpdated) {
          navigate('/admin/products');
          alert.success('Product updated successfully');
          dispatch({ type: UPDATE_PRODUCT_RESET })
      }

  }, [dispatch, alert, error, isUpdated,updateError,product,productId])


  const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('name', name);
      formData.set('price', price);
      formData.set('description', description);
      formData.set('category', category);
      formData.set('stock', stock);
      formData.set('seller', seller);

      images.forEach((image) => {
        formData.append("images", image);
      });

      dispatch(updateProduct(product._id,formData))
  }

  /*const onChange = e => {

      const files = Array.from(e.target.files)

      setImagesPreview([]);
      setImages([])
      setOldImages([])

      files.forEach(file => {
          const reader = new FileReader();

          reader.onload = () => {
              if (reader.readyState === 2) {
                  setImagesPreview(oldArray => [...oldArray, reader.result])
                  setImages(oldArray => [...oldArray, reader.result])
              }
          }

          reader.readAsDataURL(file)
      })
  } */

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


  /*return (
      <Fragment>
      <Infos title={"Update product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select className="form-control" id="category_field" 
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}>
                    <option>Electronics</option>
                    <option>Home</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e)=> setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e)=> setSeller(e.target.value)}
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
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  {oldImages && oldImages.map(img => (
                        <img key= {img} src={`http://localhost:4000/products/${img}`} alt={img} className="mt-3 mr-2" 
                        width='55' height='52' />
                  ))}
                  {imagesPreview.map(img => (
                        <img src={img} key={img} alt='Images Preview' className="mt-3 mr-2"
                        width='55' height='52'/>
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled= {loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}*/



return (
  <Fragment>
    <Infos title={"Update product"} />
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <Fragment>
        <Infos title={"Update product"} />

        <section className>
          <div className="">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="/images/update.jpg"
                        alt="login form"
                        className="img-fluidP"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form onSubmit={submitHandler} encType='multipart/form-data'>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Update product
                          </h5>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-outline mb-4">
                                <label
                                  htmlFor="name_field"
                                  className="form-label"
                                  for="formControlReadonly"
                                >
                                  Name
                                </label>
                                <input
                                  type="name"
                                  id="name_field"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="form-control form-control-lg"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-outline mb-4">
                                <label
                                  htmlFor="seller_field"
                                  className="form-label"
                                  for="formControlReadonly"
                                >
                                  Seller
                                </label>
                                <input
                                  id="seller_field"
                                  type="text"
                                  value={seller}
                                  onChange={(e) => setSeller(e.target.value)}
                                  className="form-control form-control-lg"
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
                                  for="formControlReadonly"
                                >
                                  Price
                                </label>
                                <input
                                  type="price"
                                  id="price_field"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                  className="form-control form-control-lg"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-outline mb-4">
                                <label
                                  htmlFor="stock_field"
                                  className="form-label"
                                  for="formControlReadonly"
                                >
                                  Stock
                                </label>
                                <input
                                  id="stock_field"
                                  type="text"
                                  value={stock}
                                  onChange={(e) => setStock(e.target.value)}
                                  className="form-control form-control-lg"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <label
                              htmlFor="description_field"
                              className="form-label"
                              for="formControlReadonly"
                            >
                              Description
                            </label>

                            <textarea
                              id="description_field"
                              type="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="form-control form-control-lg"
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
                                  className="form-control"
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
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  {oldImages && oldImages.map(img => (
                        <img key= {img} src={`http://localhost:4000/products/${img}`} alt={img} className="mt-3 mr-2" 
                        width='55' height='52' />
                  ))}
                  {imagesPreview.map(img => (
                        <img src={img} key={img} alt='Images Preview' className="mt-3 mr-2"
                        width='55' height='52'/>
                  ))}
                </div>

                          <div className="pt-1 mb-4">
                          <button
                  id="login_button"
                  type="submit"
                  className="btn btn-dark btn-lg btn-block"
                  disabled= {loading ? true : false}
                >
                  UPDATE
                </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </div>
  </Fragment>
);
};

export default UpdateProduct