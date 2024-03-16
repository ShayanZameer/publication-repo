import express from "express";
import { addProblems } from "../controllers/problems.js";

const router = express.Router();

router.post("/new", addProblems);

export default router;
