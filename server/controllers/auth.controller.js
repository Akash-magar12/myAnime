import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { handleError } from "../utils/handleServerError.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //! Check if fields are empty
    if (!username || !email || !password) {
      return handleError(res, {
        message: "All fields are required",
        statusCode: 400,
      });
    }

    //! Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleError(res, {
        message: "Invalid email format",
        statusCode: 400,
      });
    }

    //! Check if password length is less than 6
    if (password.length < 6) {
      return handleError(res, {
        message: "Password must be at least 6 characters",
        statusCode: 400,
      });
    }

    //! Check if email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return handleError(res, {
        message: "Email already exists",
        statusCode: 400,
      });
    }

    //! Hash password and create new user
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ username, email, password: hashPassword });

    const data = await newUser.save();
    generateToken(newUser.id, res);

    //! Destructure to exclude password from response
    const { password: _, ...rest } = data._doc;

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: rest,
    });
  } catch (error) {
    return handleError(res, error); //! Centralized error handling
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt-anime");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return handleError(res, error); //! Centralized error handling
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //! Check if fields are empty
    if (!email || !password) {
      return handleError(res, {
        message: "All fields are required",
        statusCode: 400,
      });
    }

    //! checking email
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return handleError(res, {
        message: "Email not found",
        statusCode: 400,
      });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return handleError(res, {
        message: "Password incorrect",
        statusCode: 400,
      });
    }
    generateToken(existingUser._id, res);
    const { password: _, ...userWithoutPassword } = existingUser._doc;

    return res.status(200).json({
      success: true,
      message: "login successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return handleError(res, error); //! Centralized error handling
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return handleError(res, error); //! Centralized error handling
  }
};
