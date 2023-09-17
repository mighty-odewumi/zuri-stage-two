import { Link } from "react-router-dom";
import heart from "../assets/Heart.svg";
import placeholder from "../assets/placeholder.jpg";
import Card from "./Card";


export default function SearchResults({searchResults, imdb, tomato}) {

  if (!searchResults) {
    return "Fetching Data";
  }

  if (searchResults.length === 0) {
    return <h2 className="error">Couldn't find movie. Please try again.</h2>;
  }

  const slicedResults = searchResults.slice(0, 10);

  const searchElems = slicedResults.map(movie => {

    return (
      <Link to={`/movies/${movie.id}`} key={movie.id}>
        <Card 
          movie={movie}
          heart={heart}
          placeholder={placeholder}
          imdb={imdb}
          tomato={tomato}
        />
      </Link>
    )
  });
  
  return (
    <>
      {searchElems}
    </> 
  )
}
