import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
};
