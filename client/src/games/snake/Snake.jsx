import "./Snake.css";

import useSnake from "./useSnake";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";
import GameOver from "./GameOver";

function Snake() {
  const {
    snake,
    food,
    score,
    gameOver,
    restartGame,
    rows,
    cols,
  } = useSnake();

  return (
    <div className="snake-container">

      <h1 className="snake-title">
        🐍 PlayFusion Snake
      </h1>

      <ScoreBoard score={score} />

      <GameBoard
        rows={rows}
        cols={cols}
        snake={snake}
        food={food}
      />

      {gameOver && (
        <GameOver
          score={score}
          restartGame={restartGame}
        />
      )}

    </div>
  );
}

export default Snake;