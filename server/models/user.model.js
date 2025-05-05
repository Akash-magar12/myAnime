import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
    searchHistory: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export const userModel = model("User", userSchema);
