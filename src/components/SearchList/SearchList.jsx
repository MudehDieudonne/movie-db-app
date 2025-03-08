import React from "react";
import "./SearchList.css";

const baseUrl = "https://image.tmdb.org/t/p/original";

const MovieList = ({ movies }) => {
  return (
    <div className="search-results">
      {movies.map((movie) => {
        return (
          <div className="card" key={movie.id}>
            <img src={`${baseUrl}${movie.backdrop_path}`} alt={movie.title} />
            <div className="container">
              <h4>
                <b>{movie.title}</b>
              </h4>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;