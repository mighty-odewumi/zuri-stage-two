import searchIcon from "../assets/Search.svg";
import logo1 from "../assets/logo1.svg";
import menu from "../assets/menu-icon.svg";
import imdb from "../assets/imdb.svg";
import tomato from "../assets/tomato.svg";
import play from "../assets/Play.svg";


export default function Hero({handleChange, handleSubmit}) {
  return (
    <div className="top-section">
      <header>
        <img src={logo1} alt="logo" className="logo" />
        <form>
          <input 
            type="search" 
            id="search-bar"
            placeholder="What movies do you want?"
            name="search"
            onChange={handleChange}
          />
          <button 
            className="search-btn"
            onClick={handleSubmit}
          >
            <img src={searchIcon} alt="search icon" className="search-icon"/>
          </button>
        </form>

        <img src={menu} alt="menu icon" />
      </header>

      <section id="hero">
        <h1>John Wick 3 : Parabellum</h1>

        <div className="rating-box">
          <span>
            <img 
              src={imdb}
              alt="imdb logo" 
              className="rating-logo"
            />
            <span className="rating-text">
              86/100
            </span>
          </span>

          <span>
            <img 
              src={tomato} 
              alt="rotten tomatoes logo" 
              className="rating-logo"
            />
            <span className="rating-text">
              97%
            </span>
          </span>
        </div>

        <p>
          John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
        </p>
        
        <button>
          <img src={play} alt="play icon" />
          <span className="play-text">Watch Trailer</span>
        </button>

      </section>
    
    </div>
  )
}

