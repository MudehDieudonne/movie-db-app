import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import "./SearchList.css";

const baseUrl = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  const handleClick = (movie) => {
    navigate(`/detail/${movie.id}`, { state: { movie } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="search-results-container">
      <h2 className="search-results-title">Search Results</h2>
      <div className="search-results-grid">
        {movies.map((movie) => {
          if (!movie.poster_path && !movie.backdrop_path) return null;
          return (
            <div className="movie-card" key={movie.id} onClick={() => handleClick(movie)}>
              <div className="movie-card-poster">
                <img src={`${baseUrl}${movie.poster_path || movie.backdrop_path}`} alt={movie.title} />
                <div className="movie-card-overlay">
                  <span className="movie-card-rating">★ {movie.vote_average?.toFixed(1)}</span>
                </div>
              </div>
              <div className="movie-card-info">
                <h4>{movie.title || movie.name}</h4>
                <p>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
}

export default MovieList;