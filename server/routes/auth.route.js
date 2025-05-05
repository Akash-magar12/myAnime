import express from "express";
import {
  authCheck,
  login,
  Logout,
  signUp,
} from "../controllers/auth.controller.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", Logout);
authRouter.get("/authCheck", protectedRoutes, authCheck);

export default authRouter;
