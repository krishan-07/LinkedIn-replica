import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post.js";
import createPostSlice from "./features/createPostModal.js";
import usersData from "./features/users.js";
import currUser from "./features/currUser.js";

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    popup: createPostSlice.reducer,
    usersData: usersData.reducer,
    currUser: currUser.reducer,
  },
});

export default store;
