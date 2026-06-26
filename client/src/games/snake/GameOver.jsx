function GameOver({ score, restartGame }) {
  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h1>💀 Game Over</h1>

        <h2>Final Score</h2>

        <h3>{score}</h3>

        <button
          className="restart-btn"
          onClick={restartGame}
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOver;