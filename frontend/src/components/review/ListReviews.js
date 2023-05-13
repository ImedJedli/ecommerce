import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      {reviews &&
        reviews.map((review) => (
          <div className="review-card my-3" key={review._id}>
            <div className="rating-outer">
              <div className="rating-inner" style={{width: `${(review.rating / 5) * 100}%`}}></div>
              <p className="review_user">Reviewed At :  {review.commentedAt.substring(0, 10)} , By : {review.name}</p>
            </div>
            <br></br>
            <strong> Comment :</strong> {review.comment} 
           
            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
