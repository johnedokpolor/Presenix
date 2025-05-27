import express from "express";
import { GetAllUsers } from "../controllers/user.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// All the Authentication Routes
router.get("/", GetAllUsers);

export default router;
