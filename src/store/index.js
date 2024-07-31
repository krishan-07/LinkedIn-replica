import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post.js";
import createPostSlice from "./features/createPostModal.js";
import usersData from "./features/users.js";
import currUser from "./features/currUser.js";
import profilePopupSlice from "./features/profileEditPopup.js";
import groups from "./features/groups.js";
import jobs from "./features/jobs.js";

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    popup: createPostSlice.reducer,
    usersData: usersData.reducer,
    currUser: currUser.reducer,
    profilePopup: profilePopupSlice.reducer,
    groups: groups.reducer,
    jobs: jobs.reducer,
  },
});

export default store;
