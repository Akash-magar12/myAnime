// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../reducers/ToggleSlice"; // adjust the path if needed
import userSlice from "../reducers/userSlice";
import AnimeSlice from "../reducers/AnimeSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userSlice,
    anime: AnimeSlice,
  },
});

export default store;
