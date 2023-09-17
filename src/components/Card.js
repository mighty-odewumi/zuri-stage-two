import { useState, useRef } from "react";

export default function Card({movie, heart, placeholder, imdb, tomato}) {

  // const [clickedCard, setClickedCard] = useState(null);

  const [flipColor, setFlipColor] = useState(false);

  // Tracks color change on favorite
  function handleFavClick(e) {
    // setClickedCard(movie.id);
    /* Will keep this in case I need to save to the localStorage, I would be able to get and set each movie to the localStorage if it is a favorite movie of the user using the ID of each movie. */

    setFlipColor(!flipColor);
    e.preventDefault();
  }

  const year = movie.release_date.split("-")[0];

  const randomRating = useRef(Math.floor(Math.random() * 100));

  // Used the useRef to fix the ratings rerendering on every click on the favorite icon.


  return (
    <div 
      className="card" 
      data-testid="movie-card" 
      key={movie.id}
    >
      <img 
        src={heart} 
        alt="heart icon"
        onClick={handleFavClick}
        className={`heart-icon ${flipColor ? "saved-movie" : ""}`}
      />

      <img 
        src={movie.poster_path 
          ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
          : placeholder} 
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
            {randomRating.current}/100
          </span>
        </p>

        <p>
          <img 
            src={tomato} 
            alt="rotten tomatoes logo" 
            className="rating-logo"
          />
          <span className="rating-text">
            {randomRating.current}%
          </span>
        </p>
      </div>

      <span className="genre">Action, adventure</span>
    </div>  
  )
}
