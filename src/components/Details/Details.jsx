import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import Row from "../Row/Row"
import Player from "../Player/Player"
import { IoHeart, IoHeartOutline, IoBookmark, IoBookmarkOutline, IoPlayCircle } from "react-icons/io5"
import "./Detail.css"

const baseUrl = "https://image.tmdb.org/t/p/original";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const Detail = () => {
  const { id } = useParams()
  const location = useLocation()
  const movie = location.state?.movie

  const [similarMovies, setSimilarMovies] = useState([])
  const [showPlayer, setShowPlayer] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Initial check for liked/bookmarked status
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setIsLiked(favorites.some(fav => fav.id === parseInt(id)))
    setIsBookmarked(bookmarks.some(bm => bm.id === parseInt(id)))

    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
        );
        setSimilarMovies(response.data.results || [])
      } catch (err) {
        console.error("Failed to fetch similar movies:", err)
      }
    }

    fetchSimilarMovies()
  }, [id])

  const toggleLike = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isLiked) {
      const updated = favorites.filter(fav => fav.id !== parseInt(id))
      localStorage.setItem('favorites', JSON.stringify(updated))
    } else {
      favorites.push(movie)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    setIsLiked(!isLiked)
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (isBookmarked) {
      const updated = bookmarks.filter(bm => bm.id !== parseInt(id))
      localStorage.setItem('bookmarks', JSON.stringify(updated))
    } else {
      bookmarks.push(movie)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    setIsBookmarked(!isBookmarked)
  }

  if (!movie) {
    return <div className="detail-error">Movie not found.</div>
  }

  return (
    <div className="detail">
      {showPlayer && (
        <Player
          movieId={id}
          type={movie.name ? 'tv' : 'movie'}
          onClose={() => setShowPlayer(false)}
        />
      )}

      <div className="detail-hero" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), #000000), url(${baseUrl}${movie.backdrop_path || movie.poster_path})`
      }}>
        <div className="detail-hero-content">
          <div className="detail-poster-container">
            <img
              src={`${baseUrl}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="detail-poster-img"
            />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{movie.title || movie.name}</h1>
            <div className="detail-meta">
              <span className="release-date">{movie?.release_date || movie?.first_air_date}</span>
              <span className="rating-tag">★ {movie.vote_average?.toFixed(1)}</span>
            </div>

            <div className="action-buttons">
              <button className="watch-now-btn" onClick={() => setShowPlayer(true)}>
                <IoPlayCircle /> Watch Now
              </button>
              <div className="secondary-actions">
                <button
                  className={`action-icon-btn ${isLiked ? 'active' : ''}`}
                  onClick={toggleLike}
                  title={isLiked ? "Unlike" : "Like"}
                >
                  {isLiked ? <IoHeart /> : <IoHeartOutline />}
                </button>
                <button
                  className={`action-icon-btn ${isBookmarked ? 'active' : ''}`}
                  onClick={toggleBookmark}
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                >
                  {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                </button>
              </div>
            </div>

            <p className="detail-overview">{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="more-like-this-section">
        <Row title="More Like This" movies={similarMovies} />
      </div>
    </div>
  )
}

export default Detail
