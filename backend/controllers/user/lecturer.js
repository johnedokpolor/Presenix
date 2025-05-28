import { Attendance } from "../../models/attendance.js";
import { User } from "../../models/user.js";
import crypto from "node:crypto";

// @desc   Gets all students
// @route  GET /api/users
export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// @desc   Get all attendance link for
// @route  GET /api/users/attendancelinks
export const GetAttendanceLinks = async (req, res) => {
  try {
    // Check if the user is a lecturer
    const attendanceTokens = await Attendance.find({});

    if (!attendanceTokens) {
      return res
        .status(404)
        .json({ sucess: false, message: "No attendance tokens found" });
    }
    res.status(200).json({ sucess: false, attendanceTokens });
  } catch (error) {
    throw new Error(error.message);
  }
};
// @desc   Generate an attendance link for students
// @route  POST /api/users/attendancelink
export const GenerateAttendanceLink = async (req, res) => {
  try {
    // Check if the user is a lecturer
    if (req.user.role !== "lecturer") {
      return res.status(403).json({
        success: false,
        message: "Only lecturers generate attendance links",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    const attendance = new Attendance({
      token,
      expiresAt,
      createdBy: req.user._id,
    });

    await attendance.save();
    res.status(200).json({
      success: true,
      message: "Attendance link generated successfully",
      attendance,
      attendanceLink: `${req.protocol}://${req.get(
        "host"
      )}/attendance/${token}`,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
