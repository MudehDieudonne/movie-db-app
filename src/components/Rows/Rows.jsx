import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader/Loader"
import "./Rows.css"
import { useNavigate } from "react-router-dom"

const baseUrl = "https://image.tmdb.org/t/p/original"

const Rows = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const request = await axios.get(fetchUrl)
        setMovies(request.data.results || [])
        setError(null)
      } catch (err) {
        setError("Failed to fetch movies.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [fetchUrl])

  const handleClick = (movie) => {
    navigate(`/detail/${movie.id}`, { state: { movie } });
    window.scrollTo(0, 0);
  }

  return (
    <div className="row rows">
      <h2 className="row-title">{title}</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="row-error">{error}</div>
      ) : (
        <div className="row-posters">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div className="trendx" key={movie.id} onClick={() => handleClick(movie)}>
                <span className="trend-num">{index + 1}</span>
                <img
                  className={`row-poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name || movie.title}
                />
              </div>
            ))
          ) : (
            <div className="row-empty">No movies found.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Rows