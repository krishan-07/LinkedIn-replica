import { createSlice } from "@reduxjs/toolkit";

let id = 6;
const initialState = [
  {
    email: "krishan.mondal@gmail.com",
    id: "1",
    type: "post",
    read: false,
    createdAt: "2024-07-21T08:22:54.783Z",
  },
  {
    email: "john.doe@example.com",
    id: "2",
    type: "like",
    read: false,
    createdAt: "2024-07-22T10:35:20.123Z",
  },
  {
    email: "jane.smith@example.com",
    id: "3",
    type: "comment",
    read: false,
    createdAt: "2024-07-23T12:45:33.456Z",
  },
  {
    email: "alice.jones@example.com",
    id: "4",
    type: "post",
    read: true,
    createdAt: "2024-07-24T14:55:45.789Z",
  },
  {
    email: "michael.brown@example.com",
    id: "5",
    type: "like",
    read: true,
    createdAt: "2024-07-24T15:15:22.890Z",
  },
];

const notifications = createSlice({
  name: "notification",
  initialState,
  reducers: {
    push: (state, action) => {
      state.unshift({ ...action.payload, id: id++ });
    },
    markAsRead: (state, action) => {
      const index = state.findIndex((obj) => obj.id === action.payload);
      state[index].read = true;
    },
  },
});

export default notifications;
export const notificationsActions = notifications.actions;
