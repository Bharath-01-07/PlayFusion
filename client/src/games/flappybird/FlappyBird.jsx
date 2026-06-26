import { useEffect } from "react";
import "./FlappyBird.css";
import useFlappyBird from "./useFlappyBird";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function FlappyBird() {
  const {
    birdY,
    pipes,
    score,
    gameOver,
    gameStarted,
    handleJump,
    restartGame,
    GAME_WIDTH,
    GAME_HEIGHT,
    BIRD_SIZE,
    PIPE_WIDTH,
    PIPE_GAP,
  } = useFlappyBird();

  useEffect(() => {
    if (gameOver) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        Promise.all([
          saveScore(user._id, user.username, score * 10, "FlappyBird"),
          updateRewards(user._id, score * 10),
        ]).catch(console.error);
      }
    }
  }, [gameOver, score]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleJump]);

  return (
    <div className="flappy-container">
      <h1 className="flappy-title">🐦 Flappy Bird</h1>

      <div
        className="flappy-game"
        onClick={handleJump}
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          position: "relative",
          background: "linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)",
          cursor: "pointer",
          border: "3px solid #333",
          overflow: "hidden",
        }}
      >
        {/* Bird */}
        <div
          className="flappy-bird"
          style={{
            position: "absolute",
            left: GAME_WIDTH / 2 - 15,
            top: birdY,
            width: BIRD_SIZE,
            height: BIRD_SIZE,
          }}
        >
          🐦
        </div>

        {/* Pipes */}
        {pipes.map((pipe) => (
          <div key={pipe.id}>
            {/* Top Pipe */}
            <div
              className="flappy-pipe"
              style={{
                position: "absolute",
                left: pipe.x,
                top: 0,
                width: PIPE_WIDTH,
                height: pipe.gapY,
                background: "#2ecc71",
                borderRadius: "10px 10px 0 0",
              }}
            />
            {/* Bottom Pipe */}
            <div
              className="flappy-pipe"
              style={{
                position: "absolute",
                left: pipe.x,
                top: pipe.gapY + PIPE_GAP,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT - (pipe.gapY + PIPE_GAP),
                background: "#2ecc71",
                borderRadius: "0 0 10px 10px",
              }}
            />
          </div>
        ))}

        {/* Start Screen */}
        {!gameStarted && (
          <div className="flappy-overlay">
            <h2>Click to Start</h2>
            <p>or Press SPACE</p>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="flappy-overlay">
            <h2>Game Over!</h2>
            <p>Score: {score}</p>
            <button onClick={restartGame} className="flappy-restart-btn">
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="flappy-score">Score: {score}</div>

      <button className="flappy-restart" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

export default FlappyBird;
