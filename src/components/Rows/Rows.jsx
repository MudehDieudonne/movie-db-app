import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader/Loader"
import "./Rows.css"

const baseUrl = "https://image.tmdb.org/t/p/original"

const Rows = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const request = await axios.get(fetchUrl)
        
        setMovies(request.data.results || [])
        setError(null)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch movies. Please try again later.")
          console.error(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [fetchUrl])

  return (
    <div className="row rows">
      <h2>{title}</h2>
    
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        
        <div className="row__posters">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
            
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name || movie.title}
              />
              
            ))
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Rows