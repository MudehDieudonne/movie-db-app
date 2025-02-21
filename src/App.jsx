import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Requests from "./request";
import Row from "./components/Row/Row";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Rows from "./components/Rows/Rows";
import Detail from "./components/Details/Details";// Import the Detail component
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
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
  );
}

export default App;
