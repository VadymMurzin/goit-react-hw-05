import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import MovieCast from "./components/MovieCast";
import MovieReviews from "./components/MovieReviews";

const HomePage = lazy(() => import("./pages/HomePages"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
