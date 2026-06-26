import React from "react";

function GameBoard({ rows, cols, snake, food }) {
  const cells = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let className = "cell";

      // Snake
      if (
        snake.some(
          (part) => part.x === row && part.y === col
        )
      ) {
        className = "cell snake";
      }

      // Food
      if (food.x === row && food.y === col) {
        className = "cell food";
      }

      cells.push(
        <div
          key={`${row}-${col}`}
          className={className}
        />
      );
    }
  }

  return (
    <div className="game-board">
      {cells}
    </div>
  );
}

export default GameBoard;