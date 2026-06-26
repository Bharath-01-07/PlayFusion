import { useNavigate } from "react-router-dom";
import "./Games.css";

function Games() {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Snake",
      emoji: "🐍",
      route: "/games/snake",
    },
    {
      id: 2,
      title: "Tic Tac Toe",
      emoji: "❌",
      route: "/games/tictactoe",
    },
    {
      id: 3,
      title: "Flappy Bird",
      emoji: "🐦",
      route: "/games/flappybird",
    },
    {
      id: 4,
      title: "2048",
      emoji: "🧩",
      route: "/games/2048",
    },
    {
      id: 5,
      title: "Pong",
      emoji: "🏓",
      route: "/games/pong",
    },
    {
      id: 6,
      title: "Memory Match",
      emoji: "🧠",
      route: "/games/memory",
    },
    {
      id: 7,
      title: "Breakout",
      emoji: "🧱",
      route: "/games/breakout",
    },
    {
      id: 8,
      title: "Tetris",
      emoji: "⬛",
      route: "/games/tetris",
    },
    {
      id: 9,
      title: "Hangman",
      emoji: "🎭",
      route: "/games/hangman",
    },
    {
      id: 10,
      title: "Dice Roller",
      emoji: "🎲",
      route: "/games/dice",
    },
  ];

  return (
    <div className="games-page">
      <h1>🎮 PlayFusion Games</h1>

      <div className="games-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id}>
            <h2>{game.emoji}</h2>
            <h3>{game.title}</h3>

            <button onClick={() => navigate(game.route)}>
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;