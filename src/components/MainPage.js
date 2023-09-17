import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Hero from "./Hero";
import SearchResults from "./SearchResults";
import Card from "./Card";
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
    setCount(prevValue => prevValue + 1);
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
    return <h1 className="error loading">Fetching Data</h1>;
  }
  
  const slicedResults = movieData.slice(0, 10);

  const mainElems = slicedResults.map(movie => {

    /* Eventually fixed the favorite icon bug. The bug occurred because I was defining and using the function inside my map making it to apply to other cards i.e. a click on one card can also affect the rest. By refactoring my code, I was able to detect and fix this. So, if I toggle on a favorite, it is saved for each one and not affected by the rest. */

    return (
      <Link to={`/movies/${movie.id}`} key={movie.id}>
        <Card 
          imdb={imdb}
          tomato={tomato}
          placeholder={placeholder}
          movie={movie}
          heart={heart}
        />
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
