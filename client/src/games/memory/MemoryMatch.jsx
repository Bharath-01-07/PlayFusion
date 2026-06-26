import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MemoryMatch.css";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function MemoryMatch() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matched.length === 8) {
      setGameOver(true);
      if (user) {
        Promise.all([
          saveScore(user._id, user.username, 100 - moves, "Memory Match"),
          updateRewards(user._id, 100 - moves),
        ]);
      }
    }
  }, [matched]);

  const initializeGame = () => {
    const newCards = Array.from({ length: 16 }, (_, i) => ({
      id: Math.floor(i / 2),
      value: ["🍎", "🍌", "🍊", "🍇", "🍓", "🍉", "🥝", "🍒"][
        Math.floor(i / 2)
      ],
    })).sort(() => Math.random() - 0.5);
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(cards[index].id)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]].id === cards[newFlipped[1]].id) {
        setMatched([...matched, cards[newFlipped[0]].id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 500);
      }
    }
  };

  return (
    <div className="memory-container">
      <h1>🧠 Memory Match</h1>
      <p>Moves: {moves}</p>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <button
            key={index}
            className={`memory-card ${
              flipped.includes(index) || matched.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            {flipped.includes(index) || matched.includes(card.id)
              ? card.value
              : "?"}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Moves: {moves}</p>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      )}
      <button className="back-btn" onClick={() => navigate("/games")}>
        Back to Games
      </button>
    </div>
  );
}

export default MemoryMatch;
