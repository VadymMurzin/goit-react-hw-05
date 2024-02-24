// import { useEffect, useState } from "react";
// import axios from "axios";

// const MovieCast = ({ movieId }) => {
//   const [credits, setCredits] = useState([]);

//   useEffect(() => {
//     const fetchMovieCredits = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}/credits`,
//           {
//             headers: {
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo",
//             },
//           }
//         );
//         setCredits(response.data.cast);
//       } catch (error) {
//         console.error("Error fetching movie credits:", error);
//       }
//     };

//     fetchMovieCredits();
//   }, [movieId]);


//   return (
//     <div>
//       <ul>
//         {credits.map((actor) => (
//           <li key={actor.id}>
//               {actor.name}{" "}
//               <img
//                 src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
//               />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MovieCast;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo",
            },
          }
        );
        setCredits(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
        setError("Error fetching movie credits");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && credits.length === 0 && (
        <p>No cast information available</p>
      )}
      {!loading && credits.length > 0 && (
        <ul>
          {credits.map((actor) => (
            <li key={actor.id}>
              {actor.name}{" "}
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={`${actor.name} profile`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
