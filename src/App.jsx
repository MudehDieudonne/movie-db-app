import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Requests from "./request";
import Row from "./components/Row/Row";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Rows from "./components/Rows/Rows";
import MovieList from "./components/SearchList/SearchList";
import Detail from "./components/Details/Details";
import { motion } from "motion/react";
import "./App.css";

const AppContent = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getMovieRequest = useCallback(async (search) => {
    if (!search) {
      setMovies([]);
      return;
    }
    const apiKey = import.meta.env.VITE_TMDB_API_KEY || "eab119f4519b3c48189fd1039aea8fed";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.results) {
        setMovies(data.results);
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getMovieRequest(searchValue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, getMovieRequest]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="app-container"
    >
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />

      <main className="main-content">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {searchValue ? (
                    <MovieList movies={movies} />
                  ) : (
                    <>
                      <Banner />
                      <div className="rows-container">
                        <Rows title="Latest & Trending" fetchUrl={Requests.fetchTrending} />
                        <Row title="Top Rated" fetchUrl={Requests.fetchTopRated} />
                        <Row title="Action" fetchUrl={Requests.fetchAnimationMovies} />
                        <Row title="Romance & Drama" fetchUrl={Requests.fetchRomanceMovies} />
                        <Row title="Fantasy" fetchUrl={Requests.fetchNetflixOriginals} />
                      </div>
                    </>
                  )}
                </>
              }
            />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/trending" element={<div className="coming-soon">Trending Page Coming Soon</div>} />
            <Route path="/favorites" element={<div className="coming-soon">Favorites Page Coming Soon</div>} />
          </Routes>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
