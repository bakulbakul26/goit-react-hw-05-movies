import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navigation from 'components/navigation/Navigation';

// Wykorzystujemy React.lazy() do asynchronicznego ładowania komponentów
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:movieId" exact component={MovieDetails} />
          {/* Nowa trasa dla komponentu Cast */}
          <Route path="/movies/:movieId/cast" exact component={Cast} />
          <Route path="/movies/:movieId/reviews" exact component={Reviews} />
          {/* Jeśli użytkownik poszedł nieistniejącą trasą, przekieruj go na stronę główną */}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};