import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import routes from "../../routes";

const Nav = () => {
  return (
    <ul className={styles.navigation}>
      <li>
        <Link to={routes.home}>Home</Link>
      </li>
      <li>
        <Link to={routes.movies}>Movies</Link>
      </li>
    </ul>
  );
};

export default Nav;
