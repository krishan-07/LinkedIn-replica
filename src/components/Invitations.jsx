import React from "react";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";
import ProfileImg from "./ProfileImg";

const Invitations = ({ currUser, users }) => {
  const dispatch = useDispatch();
  const { requests } = currUser;
  let data = users.filter((user) => requests.includes(user.email));

  const removeRequest = (email) => {
    dispatch(
      usersDataAction.removeRequest({
        id: currUser.email,
        email: email,
      })
    );
  };
  const acceptRequest = (email) => {
    dispatch(
      usersDataAction.acceptRequest({
        currUserEmail: currUser.email,
        userEmail: email,
      })
    );
    dispatch(
      usersDataAction.pushNotification({
        id: email,
        data: {
          id: currUser.email + "/acr", //acr: accepted connection request
          email: currUser.email,
          type: "connectionAccepted",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  return (
    <>
      <div className="network-card my-3" data-testid="invitations">
        <div className="d-flex justify-content-between">
          <div className="text-secondary fs-m px-3 py-2">Invitations</div>
          <div className="fw-m fs-m px-3 py-2 text-secondary cursor-p">
            Manage
          </div>
        </div>
        <div className="dropdown-divider"></div>
        {data.length !== 0 ? (
          data.map((user) => (
            <div
              className="d-flex py-3 align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row"
              key={user.email}
              data-testid="invitation-data"
            >
              <div className="profile col-12 col-sm-8 d-flex px-3">
                <ProfileImg
                  size={"50px"}
                  name={user.userName}
                  image={user.profileImg}
                />
                <div className="ms-3">
                  <div className="fw-m ">{user.name}</div>
                  <div className="fs-s text-secondary">{user.bio}</div>
                </div>
              </div>
              <div className="d-flex mx-3 gap-2 col-5 col-sm-3 mt-2 mt-sm-0">
                <button
                  className="btn btn-apple col w-fc"
                  onClick={() => {
                    removeRequest(user.email);
                  }}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-view-profile text-center col"
                  onClick={() => {
                    acceptRequest(user.email);
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-secondary text-center fst-italic p-4">
            No new requests
          </div>
        )}
      </div>
    </>
  );
};
export default Invitations;
