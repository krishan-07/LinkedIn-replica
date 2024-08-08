import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    email: "krishan.mondal@gmail.com",
    inbox: [
      {
        email: "john.doe@example.com",
        userName: "johndoe",
        messages: [
          {
            email: "krishan.mondal@gmail.com",
            message: "hiiiiiiiiii",
          },
          {
            email: "john.doe@example.com",
            message: "hi, how are you",
          },
          {
            email: "krishan.mondal@gmail.com",
            message: "I'm fine ",
          },
        ],
      },
    ],
  },
];

const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    send: (state, action) => {},
  },
});

export default messages;
export const messagesActions = messages.actions;
