import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to leetlab");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);

app.listen(port, () => {
  console.log("Server running on port 8080");
});
