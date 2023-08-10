import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useDarkMode } from '../Utils/DarkMode';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const apiKey = '1f189cc65d8faa305307626e5a4d4071';
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={`container-home ${darkMode ? 'dark-mode' : ''}`}>
      <h2 className="home-title">Trending Movies Today</h2>
      <ul className="home-movie-list">
        {trendingMovies.map(movie => (
          <li className="home-movie-item" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
