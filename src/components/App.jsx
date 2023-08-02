import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import Navigation from 'components/navigation/Navigation';

const Home = React.lazy(() => import('pages/home/Home'));
const Movies = React.lazy(() => import('pages/movies/Movies'));
const MovieDetails = React.lazy(() =>
  import('pages/moviedetails/MovieDetails')
);
const Cast = React.lazy(() => import('components/cast/Cast'));
const Reviews = React.lazy(() => import('components/reviews/Reviews'));

export const App = () => {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Route>
          <Route path="/" exact component={Home} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:movieId" exact component={MovieDetails} />

          <Route path="/movies/:movieId/cast" exact component={Cast} />
          <Route path="/movies/:movieId/reviews" exact component={Reviews} />

          <Navigate to="/" />
        </Route>
      </Suspense>
    </Router>
  );
};
