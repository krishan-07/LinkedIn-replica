import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "popup",
  initialState: false,
  reducers: {
    openPopup: (state) => {
      return (state = true);
    },
    closePopup: (state) => {
      return (state = false);
    },
  },
});

export default createPostSlice;
export const createPostModalActions = createPostSlice.actions;
