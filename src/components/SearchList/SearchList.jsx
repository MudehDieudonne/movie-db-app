import React from "react"
import './SearchList.css'

const baseUrl = "https://image.tmdb.org/t/p/original"

const MovieList = (props) => {
    

    return (
        <>
            {props.movies.map((movie) => {
            <div class="card">
            <img src={`${baseUrl}${movie.backdrop_path}`} alt='title'/>
                  <div class="container">
                      <h4><b>John Doe</b></h4>
                      <p>Architect & Engineer</p>
                  </div>
              </div>
            })}
        </>
    )
}

export default MovieList