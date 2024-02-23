import { useEffect, useState } from "react";
import axios from "axios";

const MovieCredits = ({ movieId }) => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo",
            },
          }
        );
        setCredits(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieCredits();
  }, [movieId]);


  return (
    <div>
      <ul>
        {credits.map((actor) => (
          <li key={actor.id}>
              {actor.name}{" "}
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;