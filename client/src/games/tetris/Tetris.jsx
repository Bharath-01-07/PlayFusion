import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tetris.css";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function Tetris() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let gameScore = 0;
    let gameActive = true;

    const scoreInterval = setInterval(() => {
      if (gameActive) {
        gameScore += Math.floor(Math.random() * 20) + 10;
        setScore(gameScore);
      }
    }, 400);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          gameActive = false;
          setGameOver(true);
          if (user && gameScore > 0) {
            Promise.all([
              saveScore(user._id, user.username, gameScore, "Tetris"),
              updateRewards(user._id, gameScore),
            ]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="tetris-container">
      <h1>⬛ Tetris</h1>
      <div className="tetris-info">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>
      <div className="tetris-grid">
        {[...Array(200)].map((_, i) => (
          <div key={i} className="tetris-cell"></div>
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

export default Tetris;
