import { createSlice } from "@reduxjs/toolkit";

const profilePopupSlice = createSlice({
  name: "profilePopup",
  initialState: false,
  reducers: {
    openPopup: (state) => (state = true),
    closePopup: (state) => (state = false),
  },
});

export default profilePopupSlice;
export const profileEdit = profilePopupSlice.actions;
