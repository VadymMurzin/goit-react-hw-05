// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Link, NavLink, useLocation, Outlet, useParams } from "react-router-dom";
// import MovieCast from "../components/MovieCast";
// import MovieReviews from "../components/MovieReviews";

// const MovieDetailsPage = () => {
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [showCredits, setShowCredits] = useState(false);
//   const [showReviews, setShowReviews] = useState(false);
//   const { movieId } = useParams();
//   const location = useLocation();
//   const prevLocation = useRef(location.state || {});

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}`,
//           {
//             headers: {
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo",
//             },
//           }
//         );
//         setMovieDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     fetchMovieDetails();
//   }, [movieId]);

//   useEffect(() => {
//     prevLocation.current = location.state || {};
//   }, [location]);

//   const handleToggleCredits = () => {
//     setShowCredits((prevShowCredits) => !prevShowCredits);
//   };

//   const handleToggleReviews = () => {
//     setShowReviews((prevShowReviews) => !prevShowReviews);
//   };

//   return (
//     <div>
//       {movieDetails && (
//         <div>
//           <Link to={prevLocation.current.from || "/movies"}>Go Back</Link>
//           <h2>{movieDetails.title}</h2>
//           <p>{movieDetails.overview}</p>
//           <img
//             src={`https://image.tmdb.org/t/p/w400/${movieDetails.poster_path}`}
//             alt={movieDetails.title}
//           />

//           {/* Movie Credits Component */}
//           <ul>
//             <NavLink to={`/movies/${movieId}/cast`} onClick={handleToggleCredits}>
//               Movie Cast
//             </NavLink>
//             {showCredits && <MovieCast movieId={movieId} />}
//             <Outlet />
//           </ul>

//           {/* Movie Reviews Component */}
//           <ul>
//             <NavLink to={`/movies/${movieId}/reviews`} onClick={handleToggleReviews}>
//               Movie Reviews
//             </NavLink>
//             {showReviews && <MovieReviews movieId={movieId} />}
//             <Outlet />
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
// export default MovieDetailsPage;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, NavLink, useLocation, Outlet, useParams } from "react-router-dom";
// import MovieCast from "../components/MovieCast";
// import MovieReviews from "../components/MovieReviews";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const prevLocation = useRef(location.state || {});

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

  const goBack = () => {
    const { from = "/movies" } = prevLocation.current;
    return from;
  };

  return (
    <div>
      {movieDetails && (
        <div>
          <Link to={goBack()}>Go Back</Link>
          <h2>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w400/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />

          {/* Movie Credits Component */}
          <ul>
            <NavLink to={`/movies/${movieId}/cast`}>Movie Cast</NavLink>
            <Outlet />
          </ul>

          {/* Movie Reviews Component */}
          <ul>
            <NavLink to={`/movies/${movieId}/reviews`}>Movie Reviews</NavLink>
            <Outlet />
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
