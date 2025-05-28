import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLoginDate: {
      type: Date,
      default: Date.now(),
    },
    matricNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "lecturer", "creator"],
      default: "student",
    },
    attendanceNo: {
      type: Number,
    },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // resetPasswordToken: String,
    // resetPasswordExpiresAt: Date,
    // verificationToken: String,
    // verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
