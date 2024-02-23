import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ5NDkyMjkyMGU4ODIzNTBiMWYwMDcyMGMyYTNlZiIsInN1YiI6IjY1ZDYyNjVkMzNhMzc2MDE4Njc4NTlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osTxCzY6WwMNw1aB8Mz5nm95MVPzZYh63DkU-M6GoUo',
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}><NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink></li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;

