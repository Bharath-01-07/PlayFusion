import { Routes, Route } from "react-router-dom";
import Snake from "./games/snake/Snake";
import TicTacToe from "./games/tictactoe/TicTacToe";
import FlappyBird from "./games/flappybird/FlappyBird";
import Game2048 from "./games/2048/Game2048";
import DiceRoller from "./games/dice/DiceRoller";
import Pong from "./games/pong/Pong";
import MemoryMatch from "./games/memory/MemoryMatch";
import Breakout from "./games/breakout/Breakout";
import Tetris from "./games/tetris/Tetris";
import Hangman from "./games/hangman/Hangman";
import MultiplayerTicTacToe from "./games/multiplayer/MultiplayerTicTacToe";
import MultiplayerLauncher from "./pages/MultiplayerLauncher";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Multiplayer from "./pages/Multiplayer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/multiplayer/:game/:roomId" element={<MultiplayerLauncher />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games/snake" element={<Snake />} />
        <Route path="/games/tictactoe" element={<TicTacToe />} />
        <Route path="/games/flappybird" element={<FlappyBird />} />
        <Route path="/games/2048" element={<Game2048 />} />
        <Route path="/games/dice" element={<DiceRoller />} />
        <Route path="/games/pong" element={<Pong />} />
        <Route path="/games/memory" element={<MemoryMatch />} />
        <Route path="/games/breakout" element={<Breakout />} />
        <Route path="/games/tetris" element={<Tetris />} />
        <Route path="/games/hangman" element={<Hangman />} />
      </Routes>
    </>
  );
}

export default App;