import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersDataAction } from "../store/features/users";
import { messagesActions } from "../store/features/messages";
import { ProfileImg } from "./Utility";
import { FaPen } from "react-icons/fa6";

const ProfileBanner = ({ user, open, isCurrUser, currUserData }) => {
  const openPopup = () => {
    open("profile");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = (email) => {
    dispatch(
      usersDataAction.sendRequest({
        id: email,
        email: currUserData.email,
      })
    );
    dispatch(
      usersDataAction.pushNotification({
        id: email,
        data: {
          id: currUserData.email,
          email: currUserData.email,
          type: "connection",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  const acceptRequest = (email) => {
    dispatch(
      usersDataAction.acceptRequest({
        currUserEmail: currUserData.email,
        userEmail: email,
      })
    );
    dispatch(
      usersDataAction.pushNotification({
        id: email,
        data: {
          id: currUserData.email + "/acr", //acr: accepted connection request
          email: currUserData.email,
          type: "connectionAccepted",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  const editProfilePicture = () => {
    open("pfp");
  };
  const viewProfilePicture = () => {
    open("viewPfp");
  };
  const addMessage = (userEmail, userName) => {
    dispatch(
      messagesActions.addMessage({
        currUser: currUserData.email,
        userEmail,
        userName,
      })
    );
    navigate(`/in/messaging/${userName}`);
  };

  return (
    <div className="profile-section w-100 position-relative pb-2">
      <div className="banner-container">
        <img src={user.profileBanner} alt="banner" />
      </div>
      <div className="position-relative">
        <div
          className="position-absolute profile-image-container cursor-p"
          onClick={isCurrUser ? editProfilePicture : viewProfilePicture}
        >
          <ProfileImg
            size={"100%"}
            image={user.profileImg}
            name={user.userName}
            disable={true}
          />
        </div>
      </div>
      <div className="space-container"></div>

      <div className="ms-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className="fw-m fs-l mt-2">{user.name}</span>
            {user.pronouns.length !== 0 && (
              <span className="text-secondary align-self-end mb-1 ps-2">
                {`(${user.pronouns})`}
              </span>
            )}
          </div>
          {isCurrUser && (
            <div className="me-3 cursor-p" onClick={openPopup}>
              <FaPen size={15} />
            </div>
          )}
          {!isCurrUser && !currUserData.connections.includes(user.email) && (
            <div className="me-3">
              {user.requests.includes(currUserData.email) && (
                <button
                  className="btn-disabled px-3 py-2 fs-s"
                  style={{ transform: "translateY(25%)" }}
                >
                  Requested
                </button>
              )}
              {currUserData.requests.includes(user.email) && (
                <button
                  className="btn-disabled px-3 py-2 fs-s"
                  style={{ transform: "translateY(25%)" }}
                  onClick={() => {
                    acceptRequest(user.email);
                  }}
                >
                  Accept
                </button>
              )}
              {!user.requests.includes(currUserData.email) &&
                !currUserData.requests.includes(user.email) && (
                  <button
                    className="btn-view-profile px-3 py-2 fs-s"
                    style={{ transform: "translateY(25%)" }}
                    onClick={() => {
                      sendRequest(user.email);
                    }}
                  >
                    Connect
                  </button>
                )}
            </div>
          )}
          {!isCurrUser && currUserData.connections.includes(user.email) && (
            <div className="me-3">
              <button
                className="btn-disabled px-3 py-2 fs-s"
                style={{ transform: "translateY(25%)" }}
                onClick={() => {
                  addMessage(user.email, user.userName);
                }}
              >
                Message
              </button>
            </div>
          )}
        </div>
        <div className="lh-1 col-9">
          <p className="mb-2 ">{user.bio}</p>
        </div>
        <div className="mt-1">
          <p className="m-0 text-secondary fs-s">{user.location}</p>
        </div>
        <div>
          <Link
            to="#"
            className="link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          >
            {user.connections.length} connections
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileBanner;
