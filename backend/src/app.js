const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const chatRouter = require("./routes/chat.route");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // Only needed for local development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/auth", authRouter);
app.use('/api/chats', chatRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../public/dist")));
  
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
  });
}

module.exports = app;
