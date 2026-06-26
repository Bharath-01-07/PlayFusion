import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🎮 PlayFusion
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/games">Games</Link>
        </li>

        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

      </ul>

      <Link to="/login">
        <button className="login-btn">
          Login
        </button>
      </Link>

    </nav>
  );
}

export default Navbar;