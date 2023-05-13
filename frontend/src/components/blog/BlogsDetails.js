import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getSingleBlog } from "../../actions/blogActions";
import Loader from "../layout/Loader";


const BlogsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }
  }, [dispatch, id]);

  const { loading, error, blog } = useSelector((state) => state.blogDetails);

  useEffect(() => {
    if (error) {
      alert.show(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  const handleFacebookShare = () => {

    const currentUrl = window.location.href;


    // Open the Facebook share dialog with the blog post's URL
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const shareUrl = window.location.href;
    const tweetText = `Check out this blog post: ${blog.title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleInstagramShare = () => {
    const shareUrl = window.location.href;
    window.open(`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <br></br> 
        <br></br>
          <div className="row f-flex justify-content-around">
            <div
              className="col-12 col-lg-5 img-fluid"
              style={{ maxHeight: "500px" }}
            >
              {blog && blog.images && (
                <Carousel pause="hover">
                  {blog.images.map((image) => (
                    <Carousel.Item key={image}>
                      <img
                        className="d-block w-100"
                        src={`http://localhost:4000/blogs/${image}`}
                        alt={blog.title}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
           
            <div className="col-12 col-lg-5 mt-5">
              {blog && (
                <Fragment>
                  <h3>{blog.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: blog.description }} />

                  
                 <h5>Share on social media :</h5>
                  <div className="share-buttons">
                    <i id="fb" className="fa fa-facebook-square" onClick={handleFacebookShare} style={{ fontSize: "30px", marginRight: "10px", cursor: "pointer" }}></i>
                    <i id="insta" className="fa fa-instagram" onClick={handleInstagramShare} style={{ fontSize: "30px", marginRight: "10px", cursor: "pointer" }}></i>
                    <i id="twitter" className="fa fa-twitter-square" onClick={handleTwitterShare} style={{ fontSize: "30px", marginRight: "10px", cursor: "pointer" }}></i>
                  </div>



                </Fragment>
              )}
            </div>
            
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogsDetails;
