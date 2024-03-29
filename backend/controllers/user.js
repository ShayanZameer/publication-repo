import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    users,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });

  sendToken(user, res, `Welcome back ${user.name}`, 200);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "user already exists",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });
  sendToken(user, res, "Registered successfully", 201);
};

export const getMyDetails = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      // sameSite: process.env.NODE_EVN === "Development"? "lax": "none",
      // secure: process.env.NODE_EVN === "Development" ? false: true,
    })
    .json({
      success: true,
      message:"Logged out successfully!"
    });
};

export const updateProfilePic = async (req, res) => {
  const { profile } = req.body;
  const user = await User.findById(req.user._id);
  await user.updateOne({
    profile,
  });
  res.json({
    success: true,
    message: "image uploaded usccessfully",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "user deleted successfully",
    user,
  });
};
