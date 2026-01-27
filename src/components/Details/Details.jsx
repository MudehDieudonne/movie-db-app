import { useState, useEffect, useCallback } from "react"
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
  const initialMovie = location.state?.movie

  const [movie, setMovie] = useState(initialMovie)
  const [credits, setCredits] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [showPlayer, setShowPlayer] = useState(false)
  const [startEpisode, setStartEpisode] = useState({ season: 1, episode: 1 })
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const fetchSeasonData = useCallback(async (seasonNumber) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}`);
      setEpisodes(response.data.episodes);
      setSelectedSeason(parseInt(seasonNumber));
    } catch (err) {
      console.error("Failed to fetch season data:", err);
    }
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setIsLiked(favorites.some(fav => fav.id === parseInt(id)))
    setIsBookmarked(bookmarks.some(bm => bm.id === parseInt(id)))

    const type = initialMovie?.name || window.location.pathname.includes('/tv/') ? 'tv' : 'movie';

    const fetchAllData = async () => {
      try {
        const detailRes = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`);
        const movieData = detailRes.data;
        setMovie(movieData);

        if (type === 'tv') {
          // Fetch season 1 details to get episode grid
          const s1 = movieData.seasons?.find(s => s.season_number === 1) || movieData.seasons?.[0];
          if (s1) fetchSeasonData(s1.season_number);
        }

        const creditRes = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`);
        setCredits(creditRes.data.cast.slice(0, 10));

        const similarRes = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${apiKey}&language=en-US&page=1`);
        setSimilarMovies(similarRes.data.results || []);
      } catch (err) {
        console.error("Failed to fetch extended data:", err);
      }
    };

    fetchAllData();
  }, [id, initialMovie, fetchSeasonData]);

  const handlePlayEpisode = (s, e) => {
    setStartEpisode({ season: s, episode: e });
    setShowPlayer(true);
  };

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

  if (!movie) return <div className="detail-error">Loading...</div>

  return (
    <div className="detail">
      {showPlayer && (
        <Player
          movieId={id}
          type={movie.name ? 'tv' : 'movie'}
          initialSeason={startEpisode.season}
          initialEpisode={startEpisode.episode}
          onClose={() => setShowPlayer(false)}
        />
      )}

      <div className="detail-hero" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #000000), url(${baseUrl}${movie.backdrop_path || movie.poster_path})`
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
              <span className="runtime">
                {movie.runtime ? `${movie.runtime}m` : movie.number_of_seasons ? `${movie.number_of_seasons} Seasons` : ''}
              </span>
              <span className="rating-tag">★ {movie.vote_average?.toFixed(1)}</span>
            </div>

            <div className="genres-list">
              {movie.genres?.map(g => (
                <span key={g.id} className="genre-pill">{g.name}</span>
              ))}
            </div>

            <div className="action-buttons">
              <button className="watch-now-btn" onClick={() => handlePlayEpisode(1, 1)}>
                <IoPlayCircle /> Watch Now
              </button>
              <div className="secondary-actions">
                <button className={`action-icon-btn ${isLiked ? 'active' : ''}`} onClick={toggleLike}>
                  {isLiked ? <IoHeart /> : <IoHeartOutline />}
                </button>
                <button className={`action-icon-btn ${isBookmarked ? 'active' : ''}`} onClick={toggleBookmark}>
                  {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                </button>
              </div>
            </div>

            <p className="detail-overview">{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="detail-content-wrapper">
        <div className="detail-main-info">
          {movie.name && movie.seasons && (
            <div className="episode-selector-section">
              <div className="section-header">
                <h3>Episodes</h3>
                <select
                  value={selectedSeason}
                  onChange={(e) => fetchSeasonData(e.target.value)}
                  className="season-dropdown-select"
                >
                  {movie.seasons.filter(s => s.season_number > 0).map(s => (
                    <option key={s.id} value={s.season_number}>Season {s.season_number}</option>
                  ))}
                </select>
              </div>
              <div className="episode-grid">
                {episodes.map(ep => (
                  <div
                    key={ep.id}
                    className={`episode-box ${startEpisode.episode === ep.episode_number && startEpisode.season === selectedSeason ? 'active' : ''}`}
                    onClick={() => handlePlayEpisode(selectedSeason, ep.episode_number)}
                  >
                    {ep.episode_number}
                  </div>
                ))}
              </div>
            </div>
          )}

          {credits.length > 0 && (
            <div className="cast-section">
              <h3>Top Cast</h3>
              <div className="cast-list">
                {credits.map(person => (
                  <div key={person.id} className="cast-card">
                    <img src={person.profile_path ? `${baseUrl}${person.profile_path}` : 'https://via.placeholder.com/100x150?text=No+Photo'} alt={person.name} />
                    <p>{person.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="more-like-this-section">
        <Row title="More Like This" movies={similarMovies} isLargeRow />
      </div>
    </div>
  )
}

export default Detail
