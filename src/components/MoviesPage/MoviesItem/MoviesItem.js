import React from "react";
import { NavLink } from "react-router-dom";
import style from "./MoviesItem.module.css";
import routes from "../../../routes";

const MoviesItem = ({ movies, dataProps }) => {
  return (
    <li className={style.moviesItem}>
      <img
        src={
          movies.poster_path
            ? `https://image.tmdb.org/t/p/w500${movies.poster_path}`
            : "https://disc1.hdfilmonline.stream/assets/general/images/no_poster.jpg"
        }
        alt={movies.title}
        className={style.moviesImage}
        width="50"
        height="70"
      />
      <NavLink
        to={{
          pathname: `${routes.movies}/${movies.id}`,
          state: { from: dataProps.location, data: movies },
        }}
        className={style.link}
        activeClassName={style.activeLink}
      >
        {movies.title ? movies.title : movies.original_name}
      </NavLink>
    </li>
  );
};

export default MoviesItem;
