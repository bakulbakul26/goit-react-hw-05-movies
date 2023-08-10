import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';
import { useDarkMode } from '../Utils/DarkMode';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '1f189cc65d8faa305307626e5a4d4071';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    const fetchMovieTrailers = async () => {
      try {
        const apiKey = '1f189cc65d8faa305307626e5a4d4071';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrailers(data.results.filter(video => video.type === 'Trailer'));
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailers();
  }, [movieId]);

  return (
    <div className={`movie-container ${darkMode ? 'dark-mode' : ''}`}>
      {movieDetails ? (
        <div>
          <h2 className="movie-title">{movieDetails.title}</h2>
          <img
            className="movie-image"
            src={IMAGE_BASE_URL + movieDetails.poster_path}
            alt={movieDetails.title}
          />
          <p className="movie-overview">{movieDetails.overview}</p>
          {trailers.length > 0 ? (
            <div>
              <h3>Trailers:</h3>
              <ul className="trailer-list">
                {trailers.map(trailer => (
                  <li key={trailer.id} className="trailer-item">
                    <a
                      className="trailer-link"
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trailer.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No trailers available.</p>
          )}
          <Link to={`/movies/${movieId}/cast`} className="btn">
            Cast
          </Link>
          <Link to={`/movies/${movieId}/reviews`} className="btn">
            Reviews
          </Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieDetails;
