import dotenv from "dotenv";

dotenv.config();

export const envVars = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
};
