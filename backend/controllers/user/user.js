import { User } from "../../models/user.js";
import { Attendance } from "../../models/attendance.js";

// @desc   Mark attendance for a student
// @route  GET /api/users/mark-attendance
export const MarkAttendance = async (req, res) => {
  try {
    const user = req.user;
    const attendanceTokens = await Attendance.find({}).populate(
      "studentsPresent",
      "name matricNumber"
    );
    // Check if the user is a student
    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can to get attendance links",
      });
    }
    const attendanceToken = await Attendance.findOne({
      expiresAt: { $gt: Date.now() },
    });
    if (!attendanceToken) {
      // If no valid attendance token is found, mark the user as absent
      return res.status(404).json({
        success: false,
        message: "Token expired, marked as absent",
      });
    }

    // Check if the user has already been marked as present
    if (attendanceToken.studentsPresent.includes(user._id)) {
      return res.status(200).json({
        success: true,
        message: "You have already been marked as present",
      });
    }

    // Mark user as present and increment the user's attendance number if they are not already present
    attendanceToken.studentsPresent.push(user._id);
    user.attendanceNo = (user.attendanceNo || 0) + 1;

    // Save the user and attendance link
    await user.save();
    await attendanceToken.save();
    res.status(200).json({
      success: true,
      message: "You have been marked as present",
      user,
      attendanceToken,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
