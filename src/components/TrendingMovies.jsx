import { useEffect, useState } from "react";
import axios from "axios";

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo",
            },
          }
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending Movies Today</h2>
      <ul>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingMovies;
