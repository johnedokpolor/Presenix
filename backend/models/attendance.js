import mongoose from "mongoose";

// Create a attendance Schema
const attendanceSchema = new mongoose.Schema(
  {
    token: String,
    expiresAt: Date,
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    studentsPresent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    studentsAbsent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create an Attendance Model
export const Attendance = mongoose.model("Attendance", attendanceSchema);
