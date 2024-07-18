import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post.js";
import createPostSlice from "./features/createPostModal.js";

const store = configureStore({
  reducer: {
    // posts: postSlice.reducer,
    popup: createPostSlice.reducer,
  },
});

export default store;
