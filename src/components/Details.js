import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import logo2 from "../assets/logo2.svg";
import home from "../assets/Home.png";
import projector from "../assets/Movie Projector.png";
import tv from "../assets/TV Show.png";
import star from "../assets/Star.png";
import list from "../assets/List.png";
import logout from "../assets/Logout.png";
import calendar from "../assets/Calendar.png";

export default function Details() {

  const [detailsData, setDetailsData] = useState(null);

  const [errorOccurred, setErrorOccurred] = useState(false);

  const { id } = useParams();

  useEffect(() => {

    const isError = id === undefined;

    const detailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=4dff3a4e1dceb79ac72e663e4c9d5f26`;

    if (isError) {
      setErrorOccurred(true);
    }

    axios.get(detailsURL)
      .then(response => {
        console.log("Details data", response.data);
        setDetailsData(response.data);
      }).catch(error => {
        return "An error occurred. Reload the page and try again.";
      })
  }, [id])

  if (!detailsData) {
    return <h2 className="error">Fetching Details</h2>;
  }

  if (errorOccurred) {
    return <Redirect to="/error" />;
  }

  return (
    <div id="details">
      <section id="sidebar">
        <img src={logo2} alt="logo" className="details-logo" />

        <div id="sidebar-links">
          <div className="link">
            <img src={home} alt="home icon" />
            <span>Home</span>
          </div>

          <div className="link active">
            <img src={projector} alt="projector icon" />
            <span>Movies</span>
          </div>

          <div className="link">
            <img src={tv} alt="tv icon" />
            <span>TV Series</span>
          </div>

          <div className="banner">
            <h3>Play movie quizzes and earn free tickets</h3>
            <p>50k people are playing now</p>

            <button>Start playing</button>
          </div>

          <div className="link">
            <img src={logout} alt="logout icon" />
            <span>Logout</span>
          </div>
        </div>
      </section>

      <section id="main-details">
        <img 
          src={`https://image.tmdb.org/t/p/original${detailsData.poster_path}`} 
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
              <img src={calendar} alt="calendar icon" className="viewmore-icon"/>
              See Showtimes
            </button>

            <button>
              <img src={list} alt="list icon" className="viewmore-icon"/>
              More watch options
            </button>
          </div>
          
        </div>
        
      </section>
    </div>
  )
}
