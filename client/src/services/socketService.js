import io from "socket.io-client";

let socket = null;

export const initSocket = (userId, username) => {
 socket = io("https://playfusion-production.up.railway.app", {
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
