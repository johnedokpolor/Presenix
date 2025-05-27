import express from "express";
import { Login, Logout, Register } from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// All the Authentication Routes
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", protect, Logout);

export default router;
