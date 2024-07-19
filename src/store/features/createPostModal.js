import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "popup",
  initialState: false,
  reducers: {
    openPopup: (state) => (state = true),
    closePopup: (state) => (state = false),
  },
});

export default createPostSlice;
export const createPostActions = createPostSlice.actions;
