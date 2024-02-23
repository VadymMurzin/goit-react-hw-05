import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo',
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;

