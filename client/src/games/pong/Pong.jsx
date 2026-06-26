import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pong.css";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function Pong() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (gameOver && user && score > 0) {
      Promise.all([
        saveScore(user._id, user.username, score, "Pong"),
        updateRewards(user._id, score),
      ]);
    }
  }, [gameOver]);

  const startGame = () => {
    setRunning(true);
    setScore(0);
    setGameOver(false);
    let localScore = 0;
    const interval = setInterval(() => {
      localScore += Math.floor(Math.random() * 3);
      setScore(localScore);
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setRunning(false);
      setGameOver(true);
    }, 8000);
  };

  return (
    <div className="pong-container">
      <h1>🏓 Pong (Demo)</h1>
      <p>Score: {score}</p>
      <div className="pong-arena">Play area (placeholder)</div>

      {!running && !gameOver && (
        <button className="btn" onClick={startGame}>
          Start Game
        </button>
      )}

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

export default Pong;
