import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e4c5f110c85160fe79ee52ae8869c5c9`
        );
        setCastData(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };

    fetchCastData();
  }, [movieId]);

  return (
    <div className={css.castContainer}>
      <ul>
        {castData.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={css.actorImage}
            />
            <p className={css.actorName}>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;