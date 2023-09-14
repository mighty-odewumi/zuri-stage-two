import { useState } from "react";
import { Link } from "react-router-dom";
import heart from "../assets/Heart.svg";
import placeholder from "../assets/placeholder.jpg";


export default function SearchResults({searchResults, imdb, tomato}) {

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

    // Tracks color change on favorite
    function handleFavClick() {
      setFlipColor(!flipColor); 
      setClickedCard(movie.id);
    }

    const randomRating = Math.floor(Math.random() * 100);
    console.log(randomRating);

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
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
              : placeholder} 
            alt="movie poster"
            className="card--img" 
            data-testid="movie-poster"
            loading="lazy"
          />
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
        </div>
      </Link>
    )
  });
  
  return (
    <>
      {searchElems}
    </> 
  )
}
