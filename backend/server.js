require("dotenv").config();
const app = require("./src/app")
const connectToDb = require("./src/config/database")
const http = require("http");
const { initSocket } = require("./src/sockets/server.socket");

const httpServer = http.createServer(app);

initSocket(httpServer);

connectToDb();

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});