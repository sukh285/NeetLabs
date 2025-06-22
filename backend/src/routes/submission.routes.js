import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllSubmissionCountForProblem,
  getAllSubmissions,
  getSubmissionsForProblem,
} from "../controllers/submission.controllers.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmissions);

submissionRoutes.get(
  "/get-submissions/:problemId",
  authMiddleware,
  getSubmissionsForProblem
);

submissionRoutes.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getAllSubmissionCountForProblem
);

export default submissionRoutes;
