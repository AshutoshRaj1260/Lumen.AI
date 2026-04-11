const { Server } = require("socket.io");

let io;

function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Only needed for local development
      credentials: true,
    },
  });

  console.log("Socket.io server is running");

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}

module.exports = {
  initSocket,
  getIO,
};
