import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket, initSocket } from "../services/socketService";
import "./Multiplayer.css";

function Multiplayer() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedGame, setSelectedGame] = useState("tictactoe");
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setPlayerName(user.username);
      initSocket(user._id, user.username);
    }
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("rooms_list", (roomsList) => {
      setRooms(roomsList);
    });

    socket.on("room_joined", (room) => {
      setCurrentRoom(room);
      setPlayers(room.players);
      setJoined(true);
    });

    socket.on("players_updated", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on("room_closed", () => {
      setJoined(false);
      setCurrentRoom(null);
    });

    socket.emit("get_rooms");

    return () => {
      socket.off("rooms_list");
      socket.off("room_joined");
      socket.off("players_updated");
      socket.off("room_closed");
    };
  }, []);

  const createRoom = () => {
    if (!roomName.trim()) return;
    const socket = getSocket();
    socket.emit("create_room", {
      name: roomName,
      game: selectedGame,
      maxPlayers: 2,
    });
    setRoomName("");
  };

  const joinRoom = (roomId) => {
    const socket = getSocket();
    socket.emit("join_room", roomId);
  };

  const playGame = () => {
    if (currentRoom && players.length === 2) {
      navigate(`/multiplayer/${currentRoom.game}/${currentRoom.id}`);
    }
  };

  const leaveRoom = () => {
    const socket = getSocket();
    socket.emit("leave_room");
    setJoined(false);
    setCurrentRoom(null);
  };

  return (
    <div className="multiplayer-container">
      <h1 className="multiplayer-title">👥 Multiplayer Rooms</h1>

      {!joined ? (
        <div className="multiplayer-content">
          <div className="create-room">
            <h2>Create New Room</h2>
            <input
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="multiplayer-input"
            />
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="multiplayer-select"
            >
              <option value="tictactoe">Tic Tac Toe</option>
              <option value="snake">Snake</option>
              <option value="dice">Dice Roller</option>
            </select>
            <button className="multiplayer-btn" onClick={createRoom}>
              Create Room
            </button>
          </div>

          <div className="available-rooms">
            <h2>Available Rooms</h2>
            <div className="rooms-list">
              {rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <h3>{room.name}</h3>
                  <p>Game: {room.game}</p>
                  <p>Players: {room.players.length}/{room.maxPlayers}</p>
                  {room.players.length < room.maxPlayers && (
                    <button
                      className="join-btn"
                      onClick={() => joinRoom(room.id)}
                    >
                      Join
                    </button>
                  )}
                  {room.players.length === room.maxPlayers && (
                    <p className="room-full">Room Full</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="room-lobby">
          <h2>{currentRoom.name}</h2>
          <p>Game: {currentRoom.game}</p>

          <div className="players-section">
            <h3>Players in Room ({players.length}/2)</h3>
            <div className="players-list">
              {players.map((player, idx) => (
                <div key={idx} className="player-item">
                  <span className="player-avatar">👤</span>
                  <span className="player-name">{player.username}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            {players.length === 2 ? (
              <button className="play-btn" onClick={playGame}>
                Start Game
              </button>
            ) : (
              <p className="waiting-text">Waiting for player to join...</p>
            )}
            <button className="leave-btn" onClick={leaveRoom}>
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Multiplayer;
