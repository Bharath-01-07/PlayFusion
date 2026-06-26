import "./TicTacToe.css";
import useTicTacToe from "./useTicTacToe";

function TicTacToe() {
  const { board, isXNext, score, gameOver, winner, handleClick, restartGame } =
    useTicTacToe();

  return (
    <div className="tictactoe-container">
      <h1 className="tictactoe-title">🎯 Tic Tac Toe</h1>

      <div className="tictactoe-score">Score: {score}</div>

      <div className="tictactoe-board">
        {board.map((value, index) => (
          <button
            key={index}
            className="tictactoe-square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="tictactoe-status">
        {winner ? (
          <p className="winner-text">🎉 Player {winner} Wins!</p>
        ) : gameOver ? (
          <p className="draw-text">It's a Draw!</p>
        ) : (
          <p>Current Player: {isXNext ? "X" : "O"}</p>
        )}
      </div>

      <button className="tictactoe-restart" onClick={restartGame}>
        Play Again
      </button>
    </div>
  );
}

export default TicTacToe;
