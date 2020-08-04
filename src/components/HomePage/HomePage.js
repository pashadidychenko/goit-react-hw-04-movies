import React from "react";
import PropTypes from "prop-types";
import Api from "../Service/Api";
import MoviesItem from "../MoviesPage/MoviesItem/MoviesItem";
import styles from "./homePage.module.css";
import LoaderSpiner from "../LoaderSpiner/LoaderSpiner";

class HomePage extends React.Component {
  state = {
    moviesData: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    Api.getMoviesData()
      .then((Data) =>
        this.setState((prevState) => {
          return { moviesData: prevState.moviesData.concat(Data) };
        })
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { moviesData, isLoading } = this.state;
    return (
      <>
        <h2 className={styles.title}>Tranding tudey</h2>
        {isLoading ? <LoaderSpiner /> : null}
        <ul>
          {moviesData.map((movies) => (
            <MoviesItem
              dataProps={this.props}
              movies={movies}
              key={movies.id}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;

HomePage.propTypes = {
  moviesData: PropTypes.array,
  isLoading: PropTypes.bool,
};
