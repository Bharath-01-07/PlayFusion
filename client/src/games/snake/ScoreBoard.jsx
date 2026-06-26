import { useEffect, useState } from "react";

function ScoreBoard({ score }) {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const savedHighScore =
      Number(localStorage.getItem("snakeHighScore")) || 0;

    if (savedHighScore > highScore) {
      setHighScore(savedHighScore);
    }

    if (score > savedHighScore) {
      localStorage.setItem("snakeHighScore", score);
      setHighScore(score);
    }
  }, [score]);

  return (
    <div className="score-board">
      <div className="score-card">
        <h3>🎯 Score</h3>
        <p>{score}</p>
      </div>

      <div className="score-card">
        <h3>🏆 High Score</h3>
        <p>{highScore}</p>
      </div>
    </div>
  );
}

export default ScoreBoard;