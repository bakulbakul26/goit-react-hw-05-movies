import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './Reviews.module.css';

const Reviews = ({ movieId }) => {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=1f189cc65d8faa305307626e5a4d4071`
        );
        setReviewsData(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews data:', error);
      }
    };

    fetchReviewsData();
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      {reviewsData.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul>
          {reviewsData.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.reviewAuthor}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
