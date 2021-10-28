import { createSlice } from "@reduxjs/toolkit";

let initialState;
const storeduserData = localStorage.getItem("user");

if (storeduserData) {
  initialState = JSON.parse(storeduserData);
} else {
  initialState = {
    id: "",
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    phone: "",
    role: "",
  };
}
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    resetUser(state) {
      state = initialState;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
