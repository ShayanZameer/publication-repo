import express from "express";
import {
  getAllUsers,
  getMyDetails,
  login,
  logout,
  registerUser,
  updateProfilePic,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/register", registerUser);

router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyDetails);
router.get("/update/profile", isAuthenticated, updateProfilePic);

export default router;
