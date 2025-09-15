import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoutes from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import session from "express-session";
import passport from "passport";
import "./config/passport.js";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.set("trust proxy", 1); // Required if behind proxy/load balancer

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://www.neetlabs.in",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",          // changed from "none"
      secure: true,             // must be true for HTTPS
      domain: ".neetlabs.in",   // share cookie across frontend + api subdomain
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Passport
app.use(passport.initialize());
// app.use(passport.session());

// Auto ping to keep site awake
const url = "https://api.neetlabs.in"; // updated backend domain
const interval = 3000;

function reloadWebsite() {
  axios
    .get(url)
    .then(() => {
      console.log("Website load");
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
    });
}
setInterval(reloadWebsite, interval);

app.get("/", (req, res) => {
  res.send("Welcome to leetlab");
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
