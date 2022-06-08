import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const tbDevice = localStorage.getItem("tbDevice");
let initialState = token
  ? { token: token, isLoggedIn: true, currDeviceFingerPrint: tbDevice }
  : { token: null, isLoggedIn: false, currDeviceFingerPrint: null };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tbDevice", action.payload.currDeviceFingerPrint);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.currDeviceFingerPrint = action.payload.currDeviceFingerPrint;
    },
    logout(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("tbDevice");
      localStorage.removeItem("user");
      state.token = null;
      state.isLoggedIn = false;
      state.currDeviceFingerPrint = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
