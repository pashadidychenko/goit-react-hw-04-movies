import React from "react";
import PropTypes from "prop-types";

const Reviews = ({ moviesReviews }) => {
  return (
    <ul>
      {moviesReviews.length > 0 ? (
        moviesReviews.map((reviews) => (
          <li key={reviews.id}>
            <h3>Author: {reviews.author}</h3>
            <p>{reviews.content}</p>
          </li>
        ))
      ) : (
        <li>
          <h3>We don't have any reviews for this movie</h3>
        </li>
      )}
    </ul>
  );
};

export default Reviews;

Reviews.propTypes = {
  moviesReviews: PropTypes.array,
};
