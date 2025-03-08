const API_KEY = 'eab119f4519b3c48189fd1039aea8fed'

const Requests = {
  fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`,
  fetchTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=1&timezone=%20Europe%2FIstanbul&with_networks=213`,
  fetchHistoryMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=36`,
  fetchAnimationMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchFantasyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=14`,
  fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
}

export default Requests