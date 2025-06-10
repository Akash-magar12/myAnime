import jwt from "jsonwebtoken";
import { envVars } from "../config/envVar.js";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, envVars.SECRET_KEY, {
    expiresIn: "24h",
  });

  res.cookie("jwt-anime", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: "None", // ✅ Allow cross-site cookies
    secure: true, // ✅ Must be true for 'None'
  });

  return token; // ! In case you want to use it somewhere (e.g., logs, headers, etc.)
};

export default generateToken;
