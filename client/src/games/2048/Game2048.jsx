import { useEffect } from "react";
import "./Game2048.css";
import use2048 from "./use2048";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function Game2048() {
  const { tiles, score, gameOver, won, move, initializeGame, getTileColor, SIZE } = use2048();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        move("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        move("right");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        move("down");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  useEffect(() => {
    if (gameOver || won) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        Promise.all([
          saveScore(user._id, user.username, score, "2048"),
          updateRewards(user._id, score),
        ]).catch(console.error);
      }
    }
  }, [gameOver, won, score]);

  return (
    <div className="game2048-container">
      <h1 className="game2048-title">2048</h1>

      <div className="game2048-info">
        <div className="game2048-score">Score: {score}</div>
        {won && <div className="game2048-won">You Won! 🎉</div>}
        {gameOver && <div className="game2048-over">Game Over! 😢</div>}
      </div>

      <div className="game2048-board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="game2048-tile"
            style={{
              backgroundColor: getTileColor(tile),
            }}
          >
            {tile > 0 && <span className="game2048-value">{tile}</span>}
          </div>
        ))}
      </div>

      <div className="game2048-instructions">
        <p>Use Arrow Keys to move tiles</p>
      </div>

      <button className="game2048-restart" onClick={initializeGame}>
        New Game
      </button>
    </div>
  );
}

export default Game2048;
