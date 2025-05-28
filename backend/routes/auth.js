import express from "express";
import {
  Login,
  Logout,
  Register,
  CheckEmail,
  CheckMatricNo,
} from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// All the Authentication Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/check-email", CheckEmail);
router.get("/check-matric-number", CheckMatricNo);
router.post("/logout", protect, Logout);

export default router;
