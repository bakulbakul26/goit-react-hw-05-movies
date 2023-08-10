import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';
import { useDarkMode } from './Utils/DarkMode';

const Home = React.lazy(() => import('./Home/Home'));
const Movies = React.lazy(() => import('./Movies/Movies'));
const MovieDetails = React.lazy(() => import('./Moviedetails/MovieDetails'));
const Cast = React.lazy(() => import('./Cast/Cast'));
const Reviews = React.lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Router basename="goit-react-hw-05-movies">
      <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
        <nav>
          <ul className="menu">
            <li>
              <Link to="/">Trending Movies Today</Link>
            </li>
            <li>
              <Link to="/movies">Search Movies</Link>
            </li>
          </ul>
          <button id="darkModeToggle" onClick={toggleDarkMode}></button>
        </nav>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/reviews" element={<Reviews />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
