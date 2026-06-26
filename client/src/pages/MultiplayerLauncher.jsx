import React from "react";
import { useParams } from "react-router-dom";
import MultiplayerTicTacToe from "../games/multiplayer/MultiplayerTicTacToe";

export default function MultiplayerLauncher() {
  const { game, roomId } = useParams();

  // route to appropriate multiplayer game component
  if (game === "tictactoe") return <MultiplayerTicTacToe />;

  return (
    <div style={{ padding: 20 }}>
      <h2>Multiplayer for "{game}" is not implemented yet.</h2>
      <p>Room: {roomId}</p>
    </div>
  );
}
