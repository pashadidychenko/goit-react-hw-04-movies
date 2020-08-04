import React from "react";
import styles from "./cast.module.css";
import PropTypes from "prop-types";

const Cast = ({ moviesCredits }) => {
  return (
    <ul className={styles.castInfo}>
      {moviesCredits.length > 0 ? (
        moviesCredits.map((credits) => (
          <li key={credits.id}>
            <img
              src={
                credits.profile_path
                  ? `https://image.tmdb.org/t/p/w500${credits.profile_path}`
                  : "https://disc1.hdfilmonline.stream/assets/general/images/no_poster.jpg"
              }
              alt={credits.name}
            />
            <h4>&#8226; {credits.name}</h4>
            <h4>&#8194;Character: {credits.character}</h4>
          </li>
        ))
      ) : (
        <li>
          <h3>We don't have any cast for this movie</h3>
        </li>
      )}
    </ul>
  );
};

export default Cast;

Cast.propTypes = {
  moviesCredits: PropTypes.array,
};
