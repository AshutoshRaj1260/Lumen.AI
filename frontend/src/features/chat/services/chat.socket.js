import { io } from "socket.io-client";

let socket;

export const initializeSocketConnection = () => {
  socket = io(import.meta.env.PROD ? "" : "http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.io server with ID: " + socket.id);
  });
};

export const getSocketId = () => socket?.id;

export const onChunk = (cb) => {
  if (socket) {
    socket.off("chunk");
    socket.on("chunk", cb);
  }
};
