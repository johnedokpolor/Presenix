import express from "express";
import {
  GetAllUsers,
  GenerateAttendanceLink,
  GetAttendanceLinks,
  DeleteUser,
  DeleteAttendanceLink,
} from "../controllers/user/lecturer.js";
import { MarkAttendance } from "../controllers/user/user.js";
import { protect, verifyLecturer } from "../middlewares/auth.js";

const router = express.Router();

// All Lecturer Routes
router.post("/generate-attendance-link", protect, GenerateAttendanceLink);
router
  .route("/attendancelinks")
  .get(protect, GetAttendanceLinks)
  .post(protect, verifyLecturer, GenerateAttendanceLink);

router.delete("/attendancelinks/:id", DeleteAttendanceLink);
router.delete("/:id", DeleteUser);

// All User Routes
router.get("/mark-attendance", protect, MarkAttendance);

// Route to get all users
router.get("/", GetAllUsers);

export default router;
