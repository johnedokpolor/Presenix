import { User } from "../models/user.js";

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
