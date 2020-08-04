import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes";
import LoaderSpiner from "./components/LoaderSpiner/LoaderSpiner";

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./components/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./components/MoviesPage/MovieDetailsPage/MovieDetailsPage")
);

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div>
            <LoaderSpiner />
          </div>
        }
      >
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.movies} exact component={MoviesPage} />
          <Route path={routes.movieDetailsPage} component={MovieDetailsPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
