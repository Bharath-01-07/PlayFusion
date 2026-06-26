import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>PLAYFUSION</h1>

        <h2>The Ultimate Gaming Platform</h2>

        <p>
          Play the latest games, compete with players
          around the world and climb the leaderboard.
        </p>

        <div className="buttons">

          <button className="play" onClick={() => navigate("/games")}>
            Play Now
          </button>

          <button className="explore" onClick={() => navigate("/games")}>
            Explore Games
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;