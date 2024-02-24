// MovieList.js
import { NavLink } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
