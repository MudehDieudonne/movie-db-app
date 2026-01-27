import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'
import "./Row.css"

const baseUrl = "https://image.tmdb.org/t/p/original"

const Row = ({ title, fetchUrl, isLargeRow, movies: initialMovies }) => {
  const [movies, setMovies] = useState(initialMovies || [])
  const [isLoading, setIsLoading] = useState(!initialMovies)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchUrl) {
      if (initialMovies) {
        setMovies(initialMovies);
        setIsLoading(false);
      }
      return;
    }

    const abortController = new AbortController()

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

    return () => {
      abortController.abort()
    }
  }, [fetchUrl, initialMovies])

  const handleClick = (movie) => {
    navigate(`/detail/${movie.id}`, { state: { movie } })
    window.scrollTo(0, 0);
  }

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="row__error">{error}</div>
      ) : (
        <div className="row__posters">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div className="trendx" key={movie.id} onClick={() => handleClick(movie)}>
                <span className="trend-num">{index + 1}</span>
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name || movie.title}
                />
              </div>
            ))
          ) : (
            <div className="row__empty">No movies found.</div>
          )}
        </div>
      )}
    </div>
  )
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string,
  isLargeRow: PropTypes.bool,
  movies: PropTypes.array,
}

export default Row