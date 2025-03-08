import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader/Loader"
import { Router, Route, useNavigate } from "react-router-dom"
import "./Row.css"

const baseUrl = "https://image.tmdb.org/t/p/original"

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Create an AbortController to cancel the request if the component unmounts
    const abortController = new AbortController()

    async function fetchData() {
      try {
        setIsLoading(true)
        const request = await axios.get(fetchUrl)
        
        setMovies(request.data.results || [])
        setFilteredMovies(request.data.results)

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

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      abortController.abort()
    }
  }, [fetchUrl])

  const handleClick = (movie) => {
    navigate(`/detail/${movie.id}`, { state: { movie } })
    console.log(movie)
  }

  const handleSearch = query => {
    const filtered = movies.filter((movie) => {
      movie.title.toLowerCase().includes(query.toLowerCase())
    })
    setFilteredMovies(filtered)
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="row__posters">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
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

export default Row