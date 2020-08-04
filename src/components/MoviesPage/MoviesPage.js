import React from "react";
import MovieDetailsPage from "./MovieDetailsPage/MovieDetailsPage";
import FindMovies from "./FindMovies";

const MoviesPage = (props) => {
  return (
    <>
      {props.location.state ? (
        <MovieDetailsPage {...props} />
      ) : (
        <FindMovies {...props} />
      )}
    </>
  );
};

export default MoviesPage;
