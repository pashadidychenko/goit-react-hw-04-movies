import React from "react";
import Api from "../Service/Api";
import queryString from "query-string";
import MoviesItem from "./MoviesItem/MoviesItem";
import style from "./FindMovies.module.css";
import PropTypes from "prop-types";
import LoaderSpiner from "../LoaderSpiner/LoaderSpiner";

class FindMovies extends React.Component {
  state = {
    searchQuery: "",
    moviesData: [],
    isLoading: false,
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      this.setState({ moviesData: null, isLoading: true });
      Api.getMoviesData("search/movie", query)
        .then((Data) => {
          this.setState({ moviesData: Data });
        })
        .catch((error) => console.log(error))
        .finally(() => this.setState({ searchQuery: "", isLoading: false }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevRequest } = queryString.parse(prevProps.location.search);
    const { query: nextRequest } = queryString.parse(
      this.props.location.search
    );
    if (prevRequest !== nextRequest) {
      this.setState({ moviesData: null, isLoading: true });
      Api.getMoviesData("search/movie", nextRequest)
        .then((data) => {
          this.setState({ moviesData: data });
        })
        .catch((error) => console.log(error))
        .finally(() => this.setState({ searchQuery: "", isLoading: false }));
    }
  }
  inputVlue = (el) => {
    const textValue = el.target.value;
    this.setState({ searchQuery: textValue });
  };

  addRequest = (el) => {
    el.preventDefault();
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${this.state.searchQuery}`,
    });
  };

  render() {
    const { searchQuery, moviesData, isLoading } = this.state;
    return (
      <>
        <div className={style.findMoviesForm}>
          <input
            className={style.findMoviesInput}
            id="findMovies"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={searchQuery}
            onChange={this.inputVlue}
          />
          <button
            className={style.findMoviesButton}
            type="button"
            onClick={this.addRequest}
          >
            Search
          </button>
        </div>
        {isLoading ? <LoaderSpiner /> : null}
        {moviesData && (
          <ul>
            {moviesData.map((movies) => (
              <MoviesItem
                dataProps={this.props}
                movies={movies}
                key={movies.id}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default FindMovies;

FindMovies.propTypes = {
  moviesData: PropTypes.array,
  searchQuery: PropTypes.string,
  isLoading: PropTypes.bool,
};
