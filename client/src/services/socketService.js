import io from "socket.io-client";

let socket = null;

export const initSocket = (userId, username) => {
  socket = io("http://localhost:5001", {
    auth: {
      userId,
      username,
    },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
