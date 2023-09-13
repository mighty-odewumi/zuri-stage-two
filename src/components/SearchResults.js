import { useState } from "react";
import axios from "axios";
import heart from "../assets/Heart.svg";


export default function SearchResults({searchResults, imdb, tomato, setDetailsData}) {

  const [flipColor, setFlipColor] = useState(false);

  const [clickedCard, setClickedCard] = useState(null);

  if (!searchResults) {
    return "Fetching Data";
  }

  if (searchResults.length === 0) {
    return <h2 className="error">Couldn't find movie. Please try again.</h2>;
  }

  const slicedResults = searchResults.slice(0, 10);

  const searchElems = slicedResults.map(movie => {

    const detailsURL = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=4dff3a4e1dceb79ac72e663e4c9d5f26`;
    
    // Shows each movie's details
    function showDetails() {
      axios.get(detailsURL)
        .then(response => {
          console.log("Details data", response.data);
          setDetailsData(response.data);
        })
    }

    // Tracks color change on favorite
    function handleFavClick() {
      setFlipColor(!flipColor); 
      setClickedCard(movie.id);
    }

    return (
      <div 
        className="card" 
        data-testid="movie-card" 
        key={movie.id}
        onClick={showDetails}
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
        <h3 data-testid="movie-title">{movie.title}</h3>
        <p data-testid="movie-release-date">{movie.release_date}
        </p>

        <div className="rating-box rating-box--featured">
          <p>
            <img src={imdb} alt="imdb logo" />
            <span className="rating-text rating-text--featured">
              86/100
            </span>
          </p>

          <p>
            <img src={tomato} alt="rotten tomatoes logo" />
            <span className="rating-text">
              97%
            </span>
          </p>
        </div>
      </div>
    )

  });
  
  return (
    <>
      {searchElems}
    </>
    
  )
}
