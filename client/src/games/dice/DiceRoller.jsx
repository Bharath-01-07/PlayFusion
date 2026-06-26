import { useState, useEffect } from "react";
import "./DiceRoller.css";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function DiceRoller() {
  const [diceValue, setDiceValue] = useState(1);
  const [score, setScore] = useState(0);
  const [rolls, setRolls] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const rollDice = () => {
    if (gameOver) return;

    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    setScore(score + value);
    setRolls(rolls + 1);

    if (rolls + 1 >= 10) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        Promise.all([
          saveScore(user._id, user.username, score, "DiceRoller"),
          updateRewards(user._id, score),
        ]).catch(console.error);
      }
    }
  }, [gameOver, score]);

  const resetGame = () => {
    setDiceValue(1);
    setScore(0);
    setRolls(0);
    setGameOver(false);
  };

  const getDiceEmoji = (value) => {
    const diceMap = {
      1: "🎲",
      2: "🎲",
      3: "🎲",
      4: "🎲",
      5: "🎲",
      6: "🎲",
    };
    return diceMap[value];
  };

  return (
    <div className="dice-container">
      <h1 className="dice-title">🎲 Dice Roller</h1>

      <div className="dice-info">
        <div className="dice-stat">Rolls: {rolls}/10</div>
        <div className="dice-stat">Score: {score}</div>
      </div>

      <div className="dice-display">
        <div className="dice-emoji">{getDiceEmoji(diceValue)}</div>
        <div className="dice-value">{diceValue}</div>
      </div>

      <button
        className="dice-roll-btn"
        onClick={rollDice}
        disabled={gameOver}
      >
        {gameOver ? "Game Over!" : "Roll Dice"}
      </button>

      {gameOver && (
        <div className="dice-result">
          <h2>Game Complete!</h2>
          <p>Final Score: {score}</p>
          <p>Average: {(score / rolls).toFixed(2)}</p>
        </div>
      )}

      <button className="dice-reset" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}

export default DiceRoller;
