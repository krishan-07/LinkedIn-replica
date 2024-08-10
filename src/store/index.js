import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post.js";
import createPostSlice from "./features/createPostModal.js";
import usersData from "./features/users.js";
import currUser from "./features/currUser.js";
import profilePopupSlice from "./features/profileEditPopup.js";
import groups from "./features/groups.js";
import jobs from "./features/jobs.js";
import messages from "./features/messages.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  posts: postSlice.reducer,
  popup: createPostSlice.reducer,
  usersData: usersData.reducer,
  currUser: currUser.reducer,
  profilePopup: profilePopupSlice.reducer,
  groups: groups.reducer,
  jobs: jobs.reducer,
  messages: messages.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This disables certain checks like serializability, needed for redux-persist
    }),
});
export const persistor = persistStore(store);
export default store;
