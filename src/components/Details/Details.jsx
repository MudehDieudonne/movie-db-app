import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import Row from "../Row/Row" // Import Row component
import "./Detail.css"

const baseUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "eab119f4519b3c48189fd1039aea8fed"; // Replace with your actual API key

const Detail = () => {
  const { id } = useParams() // Get movie ID from URL
  const location = useLocation()
  const movie = location.state?.movie

  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
        );
        setSimilarMovies(response.data.results || [])
      } catch (err) {
        setError("Failed to fetch similar movies.")
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarMovies()
  }, [id])

  if (!movie) {
    return <div>Movie not found.</div>
  }

  return (
    <div className="detail">
      <div className="detail-poster">
        <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title || movie.name}
        />
      </div>
      <div className="detail-info">
        <h2>{movie.title || movie.name}</h2>
        <p><strong>Release Date:</strong> {movie?.release_date}  <strong>Rating:</strong> {movie.vote_average}</p>
        <div className="action-buttons">
        <div className="ovalls">
        <button className="ovall-white">Watch Now</button>
        <button className="ovall-black">Add To Watch List</button>
        </div>
        </div>
        <p>{movie.overview}</p>
      </div>

      {/* More Like This Section */}
      <div className="more-like-this">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Row title="More Like This" movies={similarMovies} />
        )}
      </div>
    </div>
  );
};

export default Detail;
