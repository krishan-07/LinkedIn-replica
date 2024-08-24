import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { messagesActions } from "../store/features/messages";
import { usersDataAction } from "../store/features/users";

const ChatBox = () => {
  const userName = useLoaderData();
  const currUserEmail = useSelector((state) => state.currUser);
  const usersData = useSelector((state) => state.usersData);
  const currUserData = usersData.find((obj) => obj.email === currUserEmail);
  const messages = useSelector((state) => state.messages);
  const currInbox = messages.find((obj) => obj.email === currUserEmail);

  const chat = currInbox.inbox.find((obj) => obj.userName === userName);
  const currMssgUserData = usersData.find((obj) => obj.userName === userName);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [messageData, setMessageData] = useState();
  const dispatch = useDispatch();

  const handleSend = () => {
    dispatch(
      messagesActions.send({
        currUserEmail: currUserEmail,
        currUserName: currUserData.userName,
        userEmail: currMssgUserData.email,
        message: messageData,
      })
    );
    setMessageData("");
    dispatch(
      usersDataAction.pushNotification({
        id: currMssgUserData.email,
        data: {
          id: currUserEmail + new Date().toISOString(),
          email: currUserEmail,
          type: "message",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="position-relative" data-testid="messages">
      <div className="d-flex px-2 py-1 align-items-center border-bottom-light">
        <div className="profile d-flex align-items-center">
          <div className="ms-2">
            <div className="fw-m lh-1">{currMssgUserData.name}</div>
            <div className="fs-s text-secondary text-truncate">
              {currMssgUserData.bio.substring(0, 50) + "..."}
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          maxHeight: "60dvh",
          minHeight: "60dvh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {chat.messages.map((mssg) => {
          return mssg.email === currUserEmail ? (
            <div
              className="position-relative my-2"
              key={mssg.message}
              style={{ height: "23px" }}
              data-testid="chat"
            >
              <div className="position-absolute end-0">
                <span
                  className="chatbox-text px-2 py-1 mx-2"
                  style={{ fontSize: ".9rem" }}
                >
                  {mssg.message}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="position-relative my-2"
              key={mssg.message}
              style={{ height: "23px" }}
              data-testid="chat"
            >
              <div className="position-absolute start-0">
                <span
                  className="chatbox-text-right px-2 py-1 mx-2"
                  style={{ fontSize: ".9rem" }}
                >
                  {mssg.message}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`w-100 ${
          windowWidth < 576 ? "position-fixed bottom-0" : ""
        }`}
      >
        <div className="border-bottom-light"></div>
        <div className="d-flex align-items-center">
          <textarea
            name="chatArea"
            id="chatArea"
            className="chat-area fs-s ms-2 px-1 my-2"
            value={messageData}
            onChange={(e) => {
              setMessageData(e.target.value);
            }}
          />

          <div
            className="px-2 cursor-p"
            onClick={handleSend}
            data-testid="send-button"
          >
            <IoSend size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

export const ChatBoxLoader = ({ params }) => {
  return params.userName;
};
