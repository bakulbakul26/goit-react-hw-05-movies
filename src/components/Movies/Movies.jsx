import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';
import { useDarkMode } from '../Utils/DarkMode';

const Movies = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { darkMode } = useDarkMode();

  const handleSearchInputChange = event => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const apiKey = '1f189cc65d8faa305307626e5a4d4071';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchKeyword}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div className={`movies-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Enter search keyword"
        value={searchKeyword}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <ul className="movies-list">
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link className="movie-items" to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-thumbnail"
              />
              <span className="movies-title">
                {truncateTitle(movie.title, 12)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
