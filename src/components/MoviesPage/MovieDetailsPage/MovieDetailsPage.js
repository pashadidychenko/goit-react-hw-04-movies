import React, { Suspense, lazy } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Api from "../../Service/Api";
import styles from "./movieDetailsPage.module.css";
import PropTypes from "prop-types";
import LoaderSpiner from "../../LoaderSpiner/LoaderSpiner";

const Cast = lazy(() => import("./Cast/Cast"));
const Reviews = lazy(() => import("./Reviews/Reviews"));

class MovieDetailsPage extends React.Component {
  state = {
    moviesReviews: [],
    moviesCredits: [],
    moviesInfo: [],
    moviesGenres: [],
    isLoading: false,
  };

  async componentDidMount() {
    const moviesId = this.props.match.params.movieId;
    this.setState({ isLoading: true });
    await Api.getMoviesData(moviesId)
      .then((Data) =>
        this.setState({ moviesInfo: Data, moviesGenres: Data.genres })
      )
      .catch((error) => console.log(error));
    await Api.getMoviesData(`${moviesId}/reviews`)
      .then((Data) => this.setState({ moviesReviews: Data.results }))
      .catch((error) => console.log(error));
    await Api.getMoviesData(`${moviesId}/credits`)
      .then((Data) => this.setState({ moviesCredits: Data.cast }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  goBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
    }
  };

  render() {
    let location = this.props.location;
    const {
      moviesInfo,
      moviesReviews,
      moviesCredits,
      moviesGenres,
      isLoading,
    } = this.state;
    const genres = moviesGenres.map((el) => el.name).join(", ");
    if (this.props.location.state && this.props.location.state.from) {
      location = this.props.location.state.from;
    }
    return (
      <div>
        {isLoading ? <LoaderSpiner /> : null}
        <button
          type="button"
          onClick={this.goBack}
          className={styles.goBackButton}
        >
          &#8592; Go back
        </button>
        <div className={styles.detailContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${moviesInfo.poster_path}`}
            alt={moviesInfo.title}
            className={styles.detailsImage}
          />
          <div className={styles.detailsInfo}>
            <h2>{moviesInfo.title}</h2>
            <p>User Score: {Math.round(moviesInfo.popularity)}%</p>
            <h3>Overview</h3>
            <p>{moviesInfo.overview}</p>
            <h3>Genres</h3>
            <p>{genres}</p>
          </div>
        </div>
        <hr />
        <h3 className={styles.aditionalInfo}>Adittional information</h3>
        <ul className={styles.aditionalList}>
          <li>
            <NavLink
              to={{
                pathname: `${this.props.match.url}/cast`,
                state: { from: location },
              }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${this.props.match.url}/reviews`,
                state: { from: location },
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <hr />
        <Suspense
          fallback={
            <div>
              <LoaderSpiner />
            </div>
          }
        >
          <Switch>
            <Route
              path={`${this.props.match.url}/cast`}
              exact
              render={() => <Cast moviesCredits={moviesCredits} />}
            />
            <Route
              path={`${this.props.match.url}/reviews`}
              exact
              render={() => <Reviews moviesReviews={moviesReviews} />}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;

MovieDetailsPage.propTypes = {
  moviesReviews: PropTypes.array,
  moviesCredits: PropTypes.array,
  moviesInfo: PropTypes.array,
  moviesGenres: PropTypes.array,
  isLoading: PropTypes.bool,
};
