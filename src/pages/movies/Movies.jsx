import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cast from 'components/cast/Cast';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie] = useState(null);

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=1f189cc65d8faa305307626e5a4d4071&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form className={styles.formContainer} onSubmit={handleSearchSubmit}>
        <input
          className={styles.inputField}
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className={styles.submitButton} type="submit">
          Search
        </button>
      </form>
      <ul className={styles.moviesList}>
        {searchResults.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              <h2 className={styles.movieTitle}>{movie.title || movie.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title || selectedMovie.name}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
            alt={selectedMovie.title || selectedMovie.name}
            className={styles.moviePoster}
          />
          <p>{selectedMovie.overview}</p>

          <Cast movieId={selectedMovie.id} />
        </div>
      )}
    </div>
  );
};

export default Movies;
