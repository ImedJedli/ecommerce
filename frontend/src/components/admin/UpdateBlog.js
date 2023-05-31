import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getSingleBlog, updateBlog } from "../../actions/blogActions";
import { UPDATE_BLOG_RESET } from "../../constants/blogConstantes";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";
import {  toast } from 'react-toastify';


const UpdateBlog =() => {

    const  {id}  = useParams();
    const navigate= useNavigate()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages,setOldImages] = useState([])
    const [newImages, setNewImages] = useState([]);


  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.blog);
  const {error, blog } = useSelector((state) => state.blogDetails);

  const blogId = id;

  useEffect(() => {

      if(blog && blog._id !== blogId){
            dispatch(getSingleBlog(blogId))
      } else {
            setTitle(blog.title);
            setDescription(blog.description);
            setOldImages(blog.images)
            
      }

      if (error) {
          toast.error(error);
          dispatch(clearErrors())
      }

      if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors())
        }

      if (isUpdated) {
          navigate('/admin/blogs');
          toast.success('Blog updated successfully');
          dispatch({ type: UPDATE_BLOG_RESET })
      }

  }, [dispatch, toast, error, isUpdated,updateError,blog,blogId])

  
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
  

  /*const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.set('title', title);
      formData.set('description', description);
      if (images) {
            formData.set("images", images);
          }

      dispatch(updateBlog(blog._id,formData))
  }*/

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
  

  
 /* 
const onChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(file);
        setImagesPreview(prevState => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    };
*/

  return (
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
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
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
                        <img key= {img} src={`http://localhost:4000/blogs/${img}`} alt={img.url} className="mt-3 mr-2" 
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
}

export default UpdateBlog