import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

// ✅ Cookie Options (Best Practice)
const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction, // true on Render (HTTPS)
};

// ================= SIGN UP =================
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check email exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Generate JWT Token (FIXED)
    const token = await genToken(user._id);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "Signup successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Signup error",
      error: error.message,
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // ✅ Generate JWT Token (FIXED)
    const token = await genToken(user._id);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
};

// ================= LOGOUT =================
export const logOut = async (req, res) => {
  try {
    // Clear cookie properly
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout error",
      error: error.message,
    });
  }
};
