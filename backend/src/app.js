const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const chatRouter = require("./routes/chat.route");
const path = require("path");
const analyzerRouter = require('./routes/analyzer.route');
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const app = express();

app.use(passport.initialize());
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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
  proxy: process.env.NODE_ENV === 'production',
},(accessToken, refreshToken, profile, done)=>{
return done(null, profile);
}))

app.use("/api/auth", authRouter);
app.use('/api/chats', chatRouter);
app.use('/api/analyze', analyzerRouter)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../public/dist")));
  
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
  });
}

module.exports = app;
