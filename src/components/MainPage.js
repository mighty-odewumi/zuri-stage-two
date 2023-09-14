import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "./Hero";
import imdb from "../assets/imdb.svg";
import tomato from "../assets/tomato.svg";
import heart from "../assets/Heart.svg";
import SearchResults from "./SearchResults";
import {Link} from "react-router-dom";

export default function MainPage() {

  const [movieData, setMovieData] = useState(null);

  const [searchInput, setSearchInput] = useState({
    search: "",
  });

  const [count, setCount] = useState(0);

  const [searchResults, setSearchResults] = useState(null);

  const [flipColor, setFlipColor] = useState(false);

  const [clickedCard, setClickedCard] = useState(false);

  const firstURL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=4dff3a4e1dceb79ac72e663e4c9d5f26";

  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchInput.search}&api_key=4dff3a4e1dceb79ac72e663e4c9d5f26`;

  
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
        return `An error occurred: ${error.message}`;
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
        return `An error occurred: ${error}`;
      })
  }


  console.log(flipColor);

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


  if (!movieData) {
    return "Fetching Data";
  }
  

  const slicedResults = movieData.slice(0, 10);

  const mainElems = slicedResults.map(movie => {

    // Tracks color change on favorite
    function handleFavClick() {
      setFlipColor(!flipColor); 
      setClickedCard(movie.id);
    }

    const year = movie.release_date.split("-")[0];
    console.log(year);

    // Need to fix a bug that makes the heart icon of any saved to change when you click on another one.

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
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
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
                86/100
              </span>
            </p>

            <p>
              <img 
                src={tomato} 
                alt="rotten tomatoes logo" 
                className="rating-logo"
              />
              <span className="rating-text">
                97%
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
        </div>
      
    </>
  )
}
