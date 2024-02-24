// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';

// const MoviesPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
//         {
//           headers: {
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo',
//           },
//         }
//       );
//       setSearchResults(response.data.results);
//     } catch (error) {
//       console.error('Error searching movies:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Search Movies</h2>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <ul>
//         {searchResults.map((movie) => (
//           <li key={movie.id}><NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink></li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MoviesPage;

// MoviesPage.js
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        if (params.get('query')) {
          // Якщо є параметр 'query' у URL, виконайте пошук
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${params.get('query')}`,
            {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo', // Замініть на свій ключ
              },
            }
          );
          setSearchResults(response.data.results);
        } else {
          // В іншому випадку очистіть результати пошуку
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Error fetching movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleSearch = () => {
    // Оновіть параметри пошуку при введенні нового пошукового терміну
    setParams({ query: searchTerm });
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
};

export default MoviesPage;

