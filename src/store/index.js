import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post.js";
import createPostSlice from "./features/createPostModal.js";
import usersData from "./features/users.js";
import currUser from "./features/currUser.js";
import profilePopupSlice from "./features/profileEditPopup.js";
import notifications from "./features/notifications.js";

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    popup: createPostSlice.reducer,
    usersData: usersData.reducer,
    currUser: currUser.reducer,
    profilePopup: profilePopupSlice.reducer,
    notifications: notifications.reducer,
  },
});

export default store;
