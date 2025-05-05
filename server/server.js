import express from "express";
import { envVars } from "./config/envVar.js";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import animeRouter from "./routes/anime.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser()); //! Parses cookies into req.cookies

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/anime", animeRouter);
app.listen(envVars.PORT, () => {
  console.log(`Port running at ${envVars.PORT || 4000}`);
  dbConnection();
});
