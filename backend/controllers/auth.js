import bcryptjs from "bcryptjs";
import { User } from "../models/user.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

// @desc   Register a user, lecturer, or student
// @route  POST /api/auth/register
export const Register = async (req, res) => {
  try {
    //   Checks For All Input Fields
    const { email, name, password, matricNumber, lecturerToken } = req.body;
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    // Check if User Exists
    const emailAlreadyExists = await User.findOne({ email });
    const matricNoAlreadyExists = await User.findOne({ matricNumber });
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" });
    }
    if (matricNumber && matricNoAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Matric Number Already Exists" });
    }
    let role = "student";
    // If lecturerInviteToken is provided, set role to lecturer
    if (lecturerToken && lecturerToken === process.env.LECTURER_TOKEN) {
      role = "lecturer";
    }

    // Hashes the User's Password using bcryptsjs for security
    const hashedPassword = await bcryptjs.hash(password, 10);

    //Creates a User Object Using the User Model
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
    });

    if (matricNumber != null) {
      user.matricNumber = matricNumber;
    }

    //Generates jsonwebtoken
    generateTokenAndSetCookie(res, user._id);

    // Saves user to the Database
    await user.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        // returns everything in the user model except password
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
// @desc   Login a user, lecturer, or student
// @route  POST /api/auth/login
export const Login = async (req, res) => {
  const { password, email, matricNumber } = req.body;
  if (!((password && email) || (password && matricNumber))) {
    return res.status(400).json({
      success: false,
      message: "Please provide password and either email or matric number",
    });
  }
  try {
    let user;
    if (email) {
      // If email is provided, find user by email
      user = await User.findOne({ email });
      // Checks if email is correct
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email" });
      }
    } else {
      // If matricNumber is provided, find user by matricNumber
      user = await User.findOne({ matricNumber });
      // Checks if email is correct
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Matric Number" });
      }
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    //Generates jsonwebtoken
    generateTokenAndSetCookie(res, user._id);

    // const lastLoginDate = formatDate(Date.now());

    // Updates user's last login and saves to the database
    // user.lastLoginDate = lastLoginDate;

    // save user to db
    await user.save();

    // return response to client
    res.status(201).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// @desc   Logout a user,lecturer, or student
// @route  POST /api/auth/logout
export const Logout = async (req, res) => {
  // Check if user is authenticated
  const user = await User.findById(req.user._id).select("-password");

  // Clears the cookie and logs out the user
  res.clearCookie("token", {
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "none", // Same attribute as when the cookie was set
    path: "/", // Specify the same path used for the cookie
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
