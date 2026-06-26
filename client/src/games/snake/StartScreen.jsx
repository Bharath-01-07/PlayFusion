function StartScreen({ startGame }) {
  return (
    <div className="start-screen">

      <h1>🐍 PlayFusion Snake</h1>

      <p>
        Eat the food 🍎
      </p>

      <p>
        Don't hit yourself 💀
      </p>

      <p>
        Use ⬅️ ➡️ ⬆️ ⬇️ Arrow Keys
      </p>

      <button
        className="start-btn"
        onClick={startGame}
      >
        ▶ Start Game
      </button>

    </div>
  );
}

export default StartScreen;