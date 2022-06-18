import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const tbDevice = localStorage.getItem("tbDevice");
const tbFaceVerify = localStorage.getItem("tbFaceVerify");
let initialState = token
  ? {
      token: token,
      isLoggedIn: true,
      currDeviceFingerPrint: tbDevice,
      isFaceVerified: tbFaceVerify,
    }
  : {
      token: null,
      isLoggedIn: false,
      currDeviceFingerPrint: null,
      isFaceVerified: null,
    };
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
    setFaceVerified(state, action) {
      localStorage.setItem("tbFaceVerify", action.payload.isFaceVerified);
      state.isFaceVerified = action.payload.isFaceVerified;
    },
    logout(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("tbDevice");
      localStorage.removeItem("user");
      localStorage.removeItem("tbFaceVerify");
      state.token = null;
      state.isLoggedIn = false;
      state.currDeviceFingerPrint = null;
      state.isFaceVerified = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
