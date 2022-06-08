import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
let initialState = token
  ? { token: token, isLoggedIn: true }
  : { token: null, isLoggedIn: false };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
