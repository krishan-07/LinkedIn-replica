import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("currUser") || "";

const currUser = createSlice({
  name: "currUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("currUser", action.payload);
      return (state = action.payload);
    },
  },
});

export default currUser;
export const CurrUserActions = currUser.actions;
