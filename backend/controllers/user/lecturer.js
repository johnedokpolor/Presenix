import { Attendance } from "../../models/attendance.js";
import { User } from "../../models/user.js";
import crypto from "node:crypto";

// @desc   Gets all students
// @route  GET /api/users
export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).select("-password");
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
    const attendanceTokens = await Attendance.find({}).populate(
      "studentsPresent",
      "name matricNumber"
    );

    if (!attendanceTokens) {
      return res
        .status(404)
        .json({ success: false, message: "No attendance tokens found" });
    }
    res.status(200).json({ success: true, attendanceTokens });
  } catch (error) {
    throw new Error(error.message);
  }
};
// @desc   Generate an attendance link for students
// @route  POST /api/users/attendancelinks
export const GenerateAttendanceLink = async (req, res) => {
  try {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc   Delete a link
// @route  DELETE /api/users/attendancelinks/:id
export const DeleteAttendanceLink = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await Attendance.findByIdAndDelete(id).select("-password");
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Link deleted successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc   Delete a user
// @route  DELETE /api/users/:id
export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
