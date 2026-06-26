import { useEffect } from "react";
import "./MemoryMatch.css";
import useMemoryMatch from "./useMemoryMatch";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function MemoryMatch() {
  console.log("Memory Match Loaded!");
  const {
    cards,
    flipped,
    matched,
    moves,
    score,
    gameOver,
    handleClick,
    restartGame,
  } = useMemoryMatch();

  useEffect(() => {
    if (gameOver) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        Promise.all([
          saveScore(user._id, user.username, score, "MemoryMatch"),
          updateRewards(user._id, score),
        ]).catch(console.error);
      }
    }
  }, [gameOver, score]);

  return (
    <div className="memory-container">
      <h1 className="memory-title">🧠 Memory Match</h1>

      <div className="memory-stats">
        <div className="stat">Score: {score}</div>
        <div className="stat">Moves: {moves}</div>
      </div>

      <div className="memory-board">
        {cards.map((card, index) => (
          <button
            key={index}
            className={`memory-card ${
              flipped.includes(index) || matched.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || matched.includes(index)
              ? card.symbol
              : "?"}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="memory-game-over">
          <h2>🎉 You Won!</h2>
          <p>Score: {score}</p>
          <p>Moves: {moves}</p>
        </div>
      )}

      <button className="memory-restart" onClick={restartGame}>
        {gameOver ? "Play Again" : "Reset"}
      </button>
    </div>
  );
}

export default MemoryMatch;
