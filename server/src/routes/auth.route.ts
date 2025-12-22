import { Router } from "express";
import {
  signup,
  login,
  logout,
  changePassword,
} from "../controllers/auth.controller";
import { Protected } from "../middleware/protected.middleware";

const router = Router();

//Public Routes
router.post("/signup", signup);
router.post("/login", login);

//Private Routes
router.post("/logout", Protected, logout);
router.post("/change-password", Protected, changePassword);

export default router;
