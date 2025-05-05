import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const protectedRoutes = async (req, res, next) => {
  const token = req.cookies["jwt-anime"];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default protectedRoutes;
