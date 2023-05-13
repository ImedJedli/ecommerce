

import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteBlog, getAdminBlogs } from "../../actions/blogActions";
import { DELETE_BLOG_RESET } from "../../constants/blogConstantes";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

function UsersList() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, blogs } = useSelector((state) => state.allBlogs);
  const { isDeleted } = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(getAdminBlogs());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Blog deleted successfully');
      navigate('/admin/blogs');
      dispatch({ type: DELETE_BLOG_RESET })
  }
  }, [dispatch, alert, error,navigate]);

  const deleteBlogHandler = (id) => {
    dispatch(deleteBlog(id));
  }; 
  const [showFullDescription, setShowFullDescription] = useState(false);


  const setBlogs = () => {
    const data = {
      columns: [
        { label: "Blog ID", field: "id", sort: "asc" },
        { label: "Title ", field: "title", sort: "asc" },
        { label: "Description", field: "description", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],

      rows: [],
    };

    if (blogs) {
      blogs.forEach((blog) => {
        let description = blog.description;
        if (!showFullDescription && description.length > 100) {
          description = description.slice(0, 100) + '...';
        }
        data.rows.push({
          id: blog._id,
          title: blog.title,
          description: (
            <Fragment>
               <div style={{ display: "flex" }}>
              <div>{description}
              {!showFullDescription && description.length > 100 && ( 
                  <Link
                  to={`/admin/blogs/blog/${blog._id}`}
                    className="btnRead"
                  >
                    read more
                  </Link>
              )}
              </div>
              </div>
            </Fragment>
          ),

          actions: (
            <Fragment>
              <Link
                to={`/admin/blogs/blog/${blog._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBlogHandler(blog._id)}>
                <i className="fa fa-trash"></i>
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
      <Infos title={"All users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5"> All Blogs</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setBlogs()}
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
  );
}

export default UsersList;
