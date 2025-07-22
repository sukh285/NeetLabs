import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoutes from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import aiRoutes from "./routes/ai.routes.js";

import session from "express-session";
import passport from "passport";
import "./config/passport.js";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:5173", "https://281fb4c9fd1b.ngrok-free.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // true in production
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to leetlab");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/ai", aiRoutes);

app.listen(port, () => {
  console.log("Server running on port 8080");
});
