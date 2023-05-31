import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllBlogs } from "../../actions/blogActions";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";

function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();

  const dispatch = useDispatch();
  const { loading, blogs, error, blogsCount, resPerPage } = useSelector(
    (state) => state.allBlogs
  );

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }

    dispatch(getAllBlogs(currentPage, resPerPage));
  }, [dispatch, toast, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    console.log("setCurrentPageNo called with pageNumber:", pageNumber);

    setCurrentPage(pageNumber);
    dispatch(getAllBlogs(pageNumber, resPerPage));
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Infos title={"Latest Blog Posts"} />
          <section className="page-blog">
            <div className="overy"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="content text-center">
                    <div className="main-slider slider slick-initialized slick-slider">
                      <div className="slider-caption">
                        <h1 className="mt-2 mb-5">
                          <span className="text-color">Blogs </span>Information
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="products" className="container mt-5">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="card p-3 rounded"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  marginBottom: index !== blogs.length - 1 ? "20px" : "0",
                }}
              >
                <div>
                  <img
                    className="card-img-top mx-auto"
                    src={`http://localhost:4000/blogs/${blog.images[0]}`}
                    alt={blog.title}
                    style={{ width: "150px", height: "auto" }}
                  />
                </div>

                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title">
                    <Link to={`/blogs/blog/${blog._id}`}>{blog.title}</Link>
                  </h5>

                  <div style={{ marginLeft: "auto" }}>
                    <Link
                      to={`/blogs/blog/${blog._id}`}
                      id=""
                      className="btn btn-main mt-3"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <br></br>
            <br></br>
          </section>
          <br></br>

          {resPerPage <= blogsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={blogsCount}
                onChange={(currentPage) => {
                  console.log("currentPage updated to:", currentPage);
                  setCurrentPage(currentPage);
                }}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Blogs;
