import { useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MovieCredits from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";
import BackButtonLink from '../components/BackButtonLink';


const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCredits, setShowCredits] = useState(false);
  const { movieId } = useParams();
  const [showReviews, setShowReviews] = useState(false);

  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo",
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleToggleCredits = () => {
    setShowCredits((prevShowCredits) => !prevShowCredits);
  };

  const handleToggleReviews = () => {
    setShowReviews((prevShowReviews) => !prevShowReviews);
  };

  return (
    <div>
      
      {movieDetails && (
        <div>
          <BackButtonLink text="Go Back" to={'/'} />
          <h2>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w400/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />

          {/* Movie Credits Component */}
          <ul>
            <Link onClick={handleToggleCredits}>Movie Cast</Link>
            {showCredits && <MovieCredits movieId={movieId} />}
          </ul>

          {/* Movie Reviews Component */}
          <ul>
            <Link onClick={handleToggleReviews}>Movie Reviews</Link>
            {showReviews && <MovieReviews movieId={movieId} />}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;