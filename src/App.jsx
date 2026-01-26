import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Requests from "./request";
import Row from "./components/Row/Row";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Rows from "./components/Rows/Rows";
import MovieList from "./components/SearchList/SearchList";
import Detail from "./components/Details/Details";// Import the Detail component
import { motion } from "motion/react";
import "./App.css";
import Search from "./components/Search/Search";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
    if (!searchValue) {
      setMovies([])
      return
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=eab119f4519b3c48189fd1039aea8fed&query=${searchValue}`

    const res = await fetch(url)
    const data = await res.json()

    if (data.results) {
      setMovies(data.results)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getMovieRequest(searchValue)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="app-container"
      >
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search searchValue={searchValue} setSearchValue={setSearchValue} />
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
        </main>

        <Footer />
      </motion.div>
    </Router>
  );
}

export default App;
