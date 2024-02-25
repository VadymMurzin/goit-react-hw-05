import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const apiKey = 'ff494922920e882350b1f00720c2a3ef';
      const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
      try {
        const response = await axios.get(url);
        setPopularMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching popular movies');
        setLoading(false);
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;


// const HomePage = () => {
//   const [popularMovies, setPopularMovies] = useState([]);

//   useEffect(() => {
//     const fetchPopularMovies = async () => {
//       const apiKey = 'ff494922920e882350b1f00720c2a3ef';
//       const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
//       try {
//         const response = await axios.get(url);
//         setPopularMovies(response.data.results);
//       } catch (error) {
//         console.error('Error fetching popular movies:', error);
//       }
//     };

//     fetchPopularMovies();
//   }, []);

//   return (
//     <div>
//       <h2>Popular Movies</h2>
//       <ul>
//         {popularMovies.map((movie) => (
//           <li key={movie.id}>
//             <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;

