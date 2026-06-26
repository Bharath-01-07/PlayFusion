const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const scoreRoutes = require("./routes/scoreRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/score", scoreRoutes);
app.use("/api/user", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🎮 PlayFusion Backend Running...");
});

// Socket.IO
const rooms = new Map();

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on("get_rooms", () => {
    const roomsList = Array.from(rooms.values()).map((room) => ({
      id: room.id,
      name: room.name,
      game: room.game,
      players: room.players,
      maxPlayers: room.maxPlayers,
    }));
    socket.emit("rooms_list", roomsList);
  });

  socket.on("create_room", (data) => {
    const roomId = `room_${Date.now()}`;
    const newRoom = {
      id: roomId,
      name: data.name,
      game: data.game,
      maxPlayers: data.maxPlayers,
      players: [
        {
          id: socket.id,
          username: socket.handshake.auth.username,
        },
      ],
    };
    rooms.set(roomId, newRoom);
    socket.join(roomId);
    socket.emit("room_joined", newRoom);
    io.emit("rooms_list", Array.from(rooms.values()));
  });

  socket.on("join_room", (roomId) => {
    const room = rooms.get(roomId);
    if (room && room.players.length < room.maxPlayers) {
      room.players.push({
        id: socket.id,
        username: socket.handshake.auth.username,
      });
      socket.join(roomId);
      socket.emit("room_joined", room);
      io.to(roomId).emit("players_updated", room.players);
      io.emit("rooms_list", Array.from(rooms.values()));
    }
  });

  socket.on("leave_room", () => {
    rooms.forEach((room) => {
      const playerIndex = room.players.findIndex((p) => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        socket.leave(room.id);
        if (room.players.length === 0) {
          rooms.delete(room.id);
        } else {
          io.to(room.id).emit("players_updated", room.players);
        }
      }
    });
    io.emit("rooms_list", Array.from(rooms.values()));
  });

  socket.on("get_room_data", (roomId, callback) => {
    const room = rooms.get(roomId);
    if (room) {
      callback(room);
    }
  });

  socket.on("start_multiplayer_game", (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      room.gameActive = true;
      io.to(roomId).emit("game_status", "playing");
    }
  });

  socket.on("board_update", (roomId, newBoard, nextPlayer) => {
    io.to(roomId).emit("board_updated", newBoard, nextPlayer);
  });

  socket.on("game_winner", (roomId, winner) => {
    io.to(roomId).emit("game_winner", winner);
  });

  socket.on("game_draw", (roomId) => {
    io.to(roomId).emit("game_draw");
  });

  socket.on("disconnect", () => {
    console.log(`🔌 User disconnected: ${socket.id}`);
    rooms.forEach((room) => {
      const playerIndex = room.players.findIndex((p) => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        if (room.players.length === 0) {
          rooms.delete(room.id);
        } else {
          io.to(room.id).emit("players_updated", room.players);
          io.to(room.id).emit("room_closed");
        }
      }
    });
    io.emit("rooms_list", Array.from(rooms.values()));
  });
});

const PORT = process.env.PORT || 5001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
