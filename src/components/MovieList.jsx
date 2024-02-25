// import { NavLink } from 'react-router-dom';

// const MovieList = ({ movies }) => {
//   return (
//     <ul>
//       {movies.map((movie) => (
//         <li key={movie.id}>
//           <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieList;

import { NavLink, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <NavLink to={{
            pathname: `/movies/${movie.id}`,
            state: { from: location }
          }}>
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;


// const MovieList = ({ movies }) => {
//   const location = useLocation();

//   return (
//     <ul>
//       {movies.map((movie) => (
//         <li key={movie.id}>
//           <NavLink to={{
//             pathname: `/movies/${movie.id}`,
//             state: { from: location }
//           }}>
//             {movie.title}
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieList;

