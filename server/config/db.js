import mongoose from "mongoose";
import { envVars } from "./envVar.js";

export const dbConnection = async () => {
  try {
    let conn = await mongoose.connect(envVars.MONGO_URL);
    console.log(`Db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit(1);
  }
};
