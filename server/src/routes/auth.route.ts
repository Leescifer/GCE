import { Router } from "express";
import {
  signup,
  login,
  logout,
  changePassword,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

//Public Routes
router.post("/signup", signup);
router.post("/login", login);

//Private Routes
router.post("/logout", authMiddleware, logout);
router.post("/change-password", authMiddleware, changePassword);

export default router;
