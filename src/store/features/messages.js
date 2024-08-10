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
        ],
      },
    ],
  },
  {
    email: "john.doe@example.com",
    inbox: [
      {
        email: "krishan.mondal@gmail.com",
        userName: "sreekrishanmondal",
        messages: [
          {
            email: "krishan.mondal@gmail.com",
            message: "hiiiiiiiiii",
          },
          {
            email: "john.doe@example.com",
            message: "hi, how are you",
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
    addMessage: (state, action) => {
      const { currUser, userEmail, userName } = action.payload;
      const index = state.findIndex((obj) => obj.email === currUser);
      if (index === -1) {
        state.push({
          email: currUser,
          inbox: [{ email: userEmail, userName: userName, messages: [] }],
        });
        return;
      }

      const inboxIndex = state[index].inbox.findIndex(
        (obj) => obj.email === userEmail
      );
      if (inboxIndex === -1) {
        state[index].inbox.push({
          email: userEmail,
          userName: userName,
          messages: [],
        });
      }
    },
    send: (state, action) => {
      const { currUserEmail, currUserName, userEmail, message } =
        action.payload;
      const index = state.findIndex((obj) => obj.email === currUserEmail);
      const inboxIndex = state[index].inbox.findIndex(
        (obj) => obj.email === userEmail
      );
      state[index].inbox[inboxIndex].messages.push({
        email: currUserEmail,
        message: message,
      });

      const userIndex = state.findIndex((obj) => obj.email === userEmail);
      if (userIndex === -1) {
        state.push({
          email: userEmail,
          inbox: [
            {
              email: currUserEmail,
              userName: currUserName,
              messages: [
                {
                  email: currUserEmail,
                  message: message,
                },
              ],
            },
          ],
        });
        return;
      }
      const userInboxIndex = state[userIndex].inbox.findIndex(
        (obj) => obj.email === currUserEmail
      );
      if (userInboxIndex === -1) {
        state[userIndex].inbox.push({
          email: currUserEmail,
          userName: currUserName,
          messages: [
            {
              email: currUserEmail,
              message: message,
            },
          ],
        });
        return;
      }
      state[userIndex].inbox[userInboxIndex].messages.push({
        email: currUserEmail,
        message: message,
      });
    },
  },
});

export default messages;
export const messagesActions = messages.actions;
