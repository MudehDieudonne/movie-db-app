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
    const url = `https://api.themoviedb.org/3/search/movie?api_key=eab119f4519b3c48189fd1039aea8fed&query=${searchValue}`

    const res = await fetch(url)
    const data = await res.json()

    if (data.results) {
      setMovies(data.results)
    }
  }

  useEffect (() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40}}
      animate={{ opacity: 1, y: 5 }}
      transition={{ duration: 1.9 }}
    >
      <Router>
        <div className="header">
        <Navbar />
        <Search searchValue = {searchValue} setSearchValue = {setSearchValue} />
        <MovieList movies={movies} />
        </div>
        <Routes>
          {/* Home Page with Movies Listing */}
          <Route 
            path="/" 
            element={
              <>
                <Banner />
                <Rows title="Latest & Trending" fetchUrl={Requests.fetchTrending} />
                <Row title="Top Searches" fetchUrl={Requests.fetchTopRated} />
                <Row title="Action" fetchUrl={Requests.fetchAnimationMovies} />
                <Row title="Romance & Drama" fetchUrl={Requests.fetchRomanceMovies} />
                <Row title="Netflix Originals" fetchUrl={Requests.fetchFantasyMovies} />
              </>
            } 
          />

          {/* Movie Detail Page */}
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </motion.div>
  );
}

export default App;
