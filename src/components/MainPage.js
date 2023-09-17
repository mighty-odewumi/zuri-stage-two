import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Hero from "./Hero";
import SearchResults from "./SearchResults";
import imdb from "../assets/imdb.svg";
import tomato from "../assets/tomato.svg";
import heart from "../assets/Heart.svg";
import placeholder from "../assets/placeholder.jpg";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";
import youtube from "../assets/youtube.svg";

export default function MainPage() {

  const [movieData, setMovieData] = useState(null);

  const [searchInput, setSearchInput] = useState({
    search: "",
  });

  const [count, setCount] = useState(0);

  const [searchResults, setSearchResults] = useState(null);

  // const [flipColor, setFlipColor] = useState(false);

  const [clickedCard, setClickedCard] = useState(false);

  const [error, setError] = useState(false);

  const firstURL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=4dff3a4e1dceb79ac72e663e4c9d5f26";

  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchInput.search}&api_key=4dff3a4e1dceb79ac72e663e4c9d5f26`;

  const date = new Date();
  const year = date.getFullYear();


  // Gets the value being typed into the search bar
  function handleChange(e) {
    const {name, value} = e.target;
    setSearchInput(prevValue => (
      {
        ...prevValue,
        [name]: value,
      }
    ));
  }


  // Called on click on the search button or enter key
  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchInput);
    setCount(prevValue => prevValue + 1);
    console.log(count);
  }


  // Fetch movie data on first render
  function fetchMovieData() {
    axios.get(firstURL)
      .then(response => {
        console.log("Main Data", response.data);
        setMovieData(response.data.results);
      }).catch(error => {
        console.log("An error occurred: ", error.message);
        setError(true)
      });
  }

  
  // Fetches data when the user searches for a movie
  function fetchSearchData() {
    axios.get(searchURL)
      .then(response => {
        console.log("Search Data", response.data.results);
        setSearchResults(response.data.results);
      }).catch(error => {
        console.log("An error occurred: ", error);
        setError(true);
      })
  }


  console.log(movieData);


  // Effect for fetching data on initial render
  useEffect(() => {
    if (!movieData) {
      fetchMovieData();
    }
  })


  // Effect for fetching data on search
  useEffect(() => {
    if (count) {
      fetchSearchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])


  if (error) {
    return <h2 className="error">An error occurred! Please check your network connection and try again.</h2>;
  }
  

  if (!movieData) {
    return <h1 className="error">Fetching Data</h1>;
  }

  
  const slicedResults = movieData.slice(0, 10);

  const mainElems = slicedResults.map(movie => {

    // Tracks color change on favorite
    function handleFavClick(e) {
      setClickedCard(movie.id);
      e.stopPropagation();
    }

    const year = movie.release_date.split("-")[0];

    const randomRating = Math.floor(Math.random() * 100);
    console.log(randomRating);

    // Need to fix a bug that makes the heart icon of any saved to change when you click on another one. That is, you can only save one favorite.

    return (
      <Link to={`/movies/${movie.id}`}>
        <div 
          className="card" 
          data-testid="movie-card" 
          key={movie.id}
        >
          <img 
            src={heart} 
            alt="heart icon"
            onClick={handleFavClick}
            className={`heart-icon ${clickedCard === movie.id ? "saved-movie" : ""}`}
          />

          <img 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : placeholder} 
            alt="movie poster"
            className="card--img" 
            data-testid="movie-poster"
            loading="lazy"
          />
          <span className="country-year">USA, {year}</span>
          <h3 data-testid="movie-title">{movie.title}</h3>
          <p data-testid="movie-release-date">{movie.release_date}
          </p>

          <div className="rating-box--featured">
            <p>
              <img 
                src={imdb} 
                alt="imdb logo" 
                className="rating-logo"
              />
              <span className="rating-text rating-text--featured">
                {randomRating}/100
              </span>
            </p>

            <p>
              <img 
                src={tomato} 
                alt="rotten tomatoes logo" 
                className="rating-logo"
              />
              <span className="rating-text">
                {randomRating}%
              </span>
            </p>
          </div>

          <span className="genre">Action, adventure</span>
        </div>
      </Link>
    )
  });


  return (
    <>
      <div id="main-page">
          <Hero 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
          />

          <section id="featured">
            <h2>Featured Movie</h2>

            <div className="cards-container">
              {count === 0 
                ? mainElems 
                : <SearchResults 
                    imdb={imdb}
                    tomato={tomato}
                    searchResults={searchResults}
                  />
              }

            </div>
          </section>

          <footer>
            <div className="foot-socials">
              <img src={facebook} alt="facebook icon" className="footer-icon"/>
              <img src={instagram} alt="instagram icon" className="footer-icon"/>
              <img src={twitter} alt="twitter icon" className="footer-icon"/>
              <img src={youtube} alt="youtube icon" className="footer-icon"/>
            </div>

            <div className="footer-link error">
              <span>Conditions of Use</span>
              <span>Terms of Use</span>
              <span>Privacy Policy</span>
            </div>

            <p className="error">&copy; {year} MovieBox by Mighty Odewumi (gr1ntch)</p>
          </footer>
      </div>
    </>
  )
}
