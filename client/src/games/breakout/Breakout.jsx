import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Breakout.css";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function Breakout() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let gameScore = 0;
    let gameActive = true;

    const gameInterval = setInterval(() => {
      if (gameActive) {
        gameScore += Math.floor(Math.random() * 15) + 5;
        setScore(gameScore);
      }
    }, 300);

    setTimeout(() => {
      gameActive = false;
      setGameOver(true);
      if (user && gameScore > 0) {
        Promise.all([
          saveScore(user._id, user.username, gameScore, "Breakout"),
          updateRewards(user._id, gameScore),
        ]);
      }
    }, 20000);

    return () => clearInterval(gameInterval);
  }, []);

  return (
    <div className="breakout-container">
      <h1>🧱 Breakout</h1>
      <p>Score: {score}</p>
      <div className="breakout-grid">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="breakout-brick"></div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button onClick={() => navigate("/games")}>Back to Games</button>
        </div>
      )}
    </div>
  );
}

export default Breakout;
