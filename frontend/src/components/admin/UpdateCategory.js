import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getSingleCategory, updateCategory } from "../../actions/categoryActions";
import Infos from "../layout/Infos";
import Sidebar from "./Sidebar";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateCategory =() => {

      const { id } = useParams();
      const alert = useAlert();
      const navigate = useNavigate()
      const dispatch = useDispatch();

      const [name , setName] = useState('');
      const [description , setDescription] = useState('');

      const { loading, error: updateError } = useSelector((state) => state.allCategories);
      const {error ,category} = useSelector((state) => state.categoryDetails);

      const categoryId= id

      useEffect(() =>{
            if (category && category._id !== categoryId) {
                  dispatch(getSingleCategory(categoryId))
            }
            else {
                  setName(category.name);
                  setDescription(category.description);
            }

            if(error){
                  alert.error(error);
                  dispatch(clearErrors())
            }

            if(updateError){
                  alert.error(updateError);
                  dispatch(clearErrors())
            }
      },[dispatch, alert, error,updateError,category,categoryId])


      const submitHandler =(e) =>{
            e.preventDefault();
            
            const formData = new FormData();
            formData.set('name', name);
            formData.set('description' , description)

            dispatch(updateCategory(category._id,formData))
            .then(() => {
              alert.success('Category is updated successfully !');
              navigate('/categories'); 
            });
      }

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
                        <h2 className="mb-2">Update categorie</h2>
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
                            className="form-control "
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="#">Description</label>
                          <ReactQuill
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "100%" }}
                            className="form-control border-0 "
              
                          />                        
                        </div>
      
                        <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Update
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

  )
}

export default UpdateCategory