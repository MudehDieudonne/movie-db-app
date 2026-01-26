import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Requests from '../../request'
import { motion, AnimatePresence } from 'motion/react'
import './Banner.css'

function Banner() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Requests.fetchTrending);
      setMovies(request.data.results.slice(0, 5)); // Get top 5 trending
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) return null;

  const movie = movies[index];

  const handleWatchNow = () => {
    navigate(`/detail/${movie.id}`, { state: { movie } });
    window.scrollTo(0, 0);
  }

  return (
    <div className='hero-carousel'>
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className='hero'
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), #000000), url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className='hero_det'>
            <h1 className="hero-title">{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className='rowls'>
              <span className='upercase movietype'>Rating: {movie?.vote_average?.toFixed(1)}</span>
              <span className='movietype'>-{movie?.release_date || movie?.first_air_date}</span>
            </div>
            <p className='wrapper'>
              {movie?.overview?.length > 200 ? movie.overview.substring(0, 200) + '...' : movie?.overview}
            </p>
            <div className="ovalls">
              <button className="ovall-white" onClick={handleWatchNow}>Watch Now</button>
              <button className="ovall-black">Add To Watch List</button>
            </div>

            <div className="carousel-dots">
              {movies.map((_, i) => (
                <div
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Banner