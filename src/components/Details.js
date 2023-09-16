import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import logo2 from "../assets/logo2.svg";
import home from "../assets/Home.png";
import projector from "../assets/Movie Projector.png";
import tv from "../assets/TV Show.png";
import star from "../assets/Star.png";
import list from "../assets/List.png";
import logout from "../assets/Logout.png";
import placeholder from "../assets/placeholder.jpg";

export default function Details() {
   
  const [detailsData, setDetailsData] = useState(null);

  const [errorOccurred, setErrorOccurred] = useState(false);

  const { id } = useParams();

  useEffect(() => {

    const detailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=4dff3a4e1dceb79ac72e663e4c9d5f26`;

    axios.get(detailsURL)
      .then(response => {
        console.log("Details data", response.data);
        setDetailsData(response.data);
      }).catch(error => {
        console.log(error);
       setErrorOccurred(true);
      })
  }, [id])

  
  if (errorOccurred) {
    return <h2 className="error">An error occurred! Please check your network connection and try again.</h2>;
  }

  if (!detailsData) {
    return <h2 className="error">Fetching Details</h2>;
  }

  return (
    <div id="details">
      <section id="sidebar">
        <div className="details-logo"></div>

        <div id="sidebar-links">
          <Link to="/" >
            <div className="link">
              <img src={home} alt="home icon" />
              <span>Home</span>
            </div>
          </Link>
          
          <Link to={`/movies/${id}`}>
            <div className="link active">
              <img src={projector} alt="projector icon" />
              <span>Movies</span>
            </div>
          </Link>

          <Link to="/error">
            <div className="link">
              <img src={tv} alt="tv icon" />
              <span>TV Series</span>
            </div>
          </Link>
          

          <div className="banner">
            <h3>Play movie quizzes and earn free tickets</h3>
            <p>50k people are playing now</p>

            <button>Start playing</button>
          </div>

          <Link to="/">
            <div className="link">
              <img src={logout} alt="logout icon" />
              <span>Logout</span>
            </div>
          </Link>
          
        </div>
      </section>

      <section id="main-details">
        <img 
          src={detailsData.poster_path 
            ? `https://image.tmdb.org/t/p/original${detailsData.poster_path}`
            : placeholder} 
          alt="movie poster"
          className="details--img" 
          data-testid="movie-poster"
          loading="lazy"
        />
        
        <div className="movie-info-badges">

          <div className="movie-info-badges-left">
            <h3 data-testid="movie-title">
              {detailsData.title}
            </h3>

            <span>•</span>

            <p 
              data-testid="movie-release-date" className="badge-info-bold"
            >
              {detailsData.release_date}
            </p>

            <span>•</span>

            <p 
              data-testid="movie-runtime" className="badge-info-bold"
            >
              {detailsData.runtime}
            </p>
          </div>

          <div className="movie-info-badges-right">
            <img src={star} alt="star icon" />
            <p>
              <span>
                {Math.floor(detailsData.vote_average)}&nbsp;
              </span> 
              | {Math.floor(detailsData.vote_count)}
            </p>
          </div>
        </div>

        <div className="overview-viewmore">
          <div className="overview">
            <p data-testid="movie-overview">{detailsData.overview}</p>

            <button>Top Rated Movie #65</button>
          </div>

          <div className="viewmore">
            <button>
              See Showtimes
            </button>

            <button>
              <img src={list} alt="list icon" className="viewmore-icon"/>

              <div className="viewmore-icon"></div>
              More watch options
            </button>

            <div className="viewmore-img"></div>
          </div>
        </div>
        
      </section>
    </div>
  )
}
