import React, { useState, useEffect } from "react";
import "./MultiplayerTicTacToe.css";
import { getSocket } from "../../services/socketService";
import { useParams, useNavigate } from "react-router-dom";

export default function MultiplayerTicTacToe() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = getSocket();
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [roomData, setRoomData] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting"); // waiting, playing, finished
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("get_room_data", roomId, (data) => {
      setRoomData(data);
      setCurrentPlayer(data.players[0]);
    });

    socket.on("board_updated", (newBoard, nextPlayer) => {
      setBoard(newBoard);
      setIsXNext(nextPlayer);
    });

    socket.on("game_status", (status) => {
      setGameStatus(status);
    });

    socket.on("game_winner", (winnerPlayer) => {
      setWinner(winnerPlayer);
      setGameStatus("finished");
    });

    socket.on("game_draw", () => {
      setWinner("draw");
      setGameStatus("finished");
    });

    return () => {
      socket.off("board_updated");
      socket.off("game_status");
      socket.off("game_winner");
      socket.off("game_draw");
    };
  }, [socket, roomId]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || gameStatus !== "playing") return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      socket.emit("game_winner", roomId, gameWinner);
    } else if (newBoard.every((cell) => cell !== null)) {
      socket.emit("game_draw", roomId);
    } else {
      socket.emit("board_update", roomId, newBoard, !isXNext);
    }
    
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleStartGame = () => {
    socket.emit("start_multiplayer_game", roomId);
    setGameStatus("playing");
  };

  const handleQuitGame = () => {
    socket.emit("leave_room");
    navigate("/multiplayer");
  };

  const renderSquare = (index) => (
    <button className="tictactoe-square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  if (!roomData) {
    return <div className="multiplayer-tictactoe-loading">Loading...</div>;
  }

  return (
    <div className="multiplayer-tictactoe-container">
      <h1>🎮 Multiplayer Tic Tac Toe</h1>
      
      <div className="room-info">
        <h2>Room: {roomData.name}</h2>
        <div className="players-list">
          <h3>Players:</h3>
          {roomData.players.map((player) => (
            <div key={player.id} className="player-item">
              {player.username} {currentPlayer?.id === player.id && "(Current)"}
            </div>
          ))}
        </div>
      </div>

      <div className="game-section">
        <div className="status-bar">
          {gameStatus === "waiting" && (
            <div className="status waiting">⏳ Waiting for opponent...</div>
          )}
          {gameStatus === "playing" && (
            <div className="status playing">
              🎮 Current Turn: <strong>{isXNext ? "X" : "O"}</strong>
            </div>
          )}
          {gameStatus === "finished" && (
            <div className="status finished">
              {winner === "draw" ? "🤝 It's a Draw!" : `🎉 ${winner} Wins!`}
            </div>
          )}
        </div>

        <div className="tictactoe-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>

        <div className="game-controls">
          {gameStatus === "waiting" && roomData.players.length >= 2 && (
            <button className="btn btn-start" onClick={handleStartGame}>
              Start Game
            </button>
          )}
          {gameStatus === "finished" && (
            <button className="btn btn-restart" onClick={() => window.location.reload()}>
              Play Again
            </button>
          )}
          <button className="btn btn-quit" onClick={handleQuitGame}>
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
}
