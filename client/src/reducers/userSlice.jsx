import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});
export const { logOutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
