import { useDispatch, useSelector } from "react-redux";
import { Body, Column, nameToLink, ProfileImg } from "./Utility";
import { Link } from "react-router-dom";
import { groupsActions } from "../store/features/groups";
import { usersDataAction } from "../store/features/users";

const card = {
  borderRadius: "10px",
  background: "white",
  overflow: "clip",
};

const Invitations = ({ currUser, users }) => {
  const dispatch = useDispatch();
  const { requests } = currUser;
  let data = users.filter((user) => requests.includes(user.email));

  const removeRequest = (email) => {
    dispatch(
      usersDataAction.removeRequest({
        currUserEmail: currUser.email,
        userEmail: email,
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
      <div className="my-3" style={card}>
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

const FindPeople = ({ currUser, users }) => {
  const dispatch = useDispatch();
  const { requests } = currUser;
  const { connections } = currUser;
  let unfiltered = users.filter((user) => !requests.includes(user.email));
  let data = unfiltered.filter((user) => !connections.includes(user.email));

  const sendRequest = (email) => {
    dispatch(
      usersDataAction.sendRequest({
        id: email,
        email: currUser.email,
      })
    );
    dispatch(
      usersDataAction.pushNotification({
        id: email,
        data: {
          id: currUser.email,
          email: currUser.email,
          type: "connection",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  return (
    <>
      <div className="pt-2 mb-4" style={card}>
        <div className="d-flex justify-content-between">
          <div className="text-secondary fs-m px-3 py-2">
            People you may know
          </div>
          <div className="fw-m fs-m px-3 py-2 text-secondary w-fc cursor-p">
            See all
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <div className="mt-3">
          <div className="row px-2">
            {data.map((user) => (
              <Column
                className={"col-6 col-sm-4 col-xl-3 mb-4"}
                key={user.email}
              >
                <div className="connection-card">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="banner-container">
                      <img src={user.profileBanner} alt="" />
                    </div>
                    <div className="connection-img">
                      <ProfileImg
                        size={"90px"}
                        name={user.userName}
                        image={user.profileImg}
                      />
                    </div>
                  </div>
                  <div style={{ height: "65px" }}></div>
                  <div className="text-center text-truncate fw-m px-2">
                    <Link
                      to={`/in/${user.userName}`}
                      className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m"
                    >
                      {user.name}
                    </Link>
                  </div>
                  <div
                    className="text-center text-secondary px-1"
                    style={{ fontSize: ".9rem", minHeight: "42px" }}
                  >
                    {user.bio.substring(0, 45) + " ..."}
                  </div>
                  <div className="my-3 text-center fs-s text-secondary">
                    Based on your profile
                  </div>

                  <div className="mx-4 mb-3">
                    {!user.requests.includes(currUser.email) ? (
                      <button
                        className="btn btn-view-profile"
                        onClick={() => {
                          sendRequest(user.email);
                        }}
                      >
                        Connect
                      </button>
                    ) : (
                      <button className="btn btn-disabled">Requested</button>
                    )}
                  </div>
                </div>
              </Column>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Groups = () => {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  const joinGroup = (id) => {
    dispatch(groupsActions.joined(id));
  };
  const leaveGroup = (id) => {
    dispatch(groupsActions.leave(id));
  };

  return (
    <>
      <div className="py-2 mb-4" style={card}>
        <div className="d-flex justify-content-between">
          <div className="text-secondary fs-m px-3 py-2">
            Groups you may interested in
          </div>
          <div className="fw-m fs-m px-3 py-2 text-secondary w-fc cursor-p">
            See all
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <div className="mt-3">
          <div className="row px-2">
            {groups.map((group) => (
              <Column className={"col-6 col-sm-4 col-xl-3 mb-4"} key={group.id}>
                <div className="connection-card">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="banner-container">
                      <img src={group.banner} alt="" />
                    </div>
                    <div className="connection-img">
                      <img src={group.image} alt="" />
                    </div>
                  </div>
                  <div style={{ height: "65px" }}></div>
                  <div className="text-center fw-m px-2 my-3">
                    <Link
                      to="/in/mynetwork"
                      className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m"
                    >
                      {group.name.substring(0, 30) + " ..."}
                    </Link>
                  </div>
                  <div
                    className="text-center text-secondary px-1 mb-3"
                    style={{ fontSize: ".9rem" }}
                  >
                    {group.members} members
                  </div>

                  <div className="mx-4 mb-3">
                    <button
                      className={`btn fw-m ${
                        group.joined ? "btn-disabled" : "btn-view-profile"
                      }`}
                      onClick={() => {
                        group.joined
                          ? leaveGroup(group.id)
                          : joinGroup(group.id);
                      }}
                    >
                      {group.joined ? "Joined" : "Join"}
                    </button>
                  </div>
                </div>
              </Column>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Network = () => {
  const users = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const currUser = users.find((user) => user.email === currUserEmail);
  const remainingUsers = users.filter((user) => user.email !== currUserEmail);

  return (
    <div style={{ height: "100%" }}>
      <Body>
        <Column className={"col-12 col-lg-9"}>
          <Invitations currUser={currUser} users={users} />
          <FindPeople users={remainingUsers} currUser={currUser} />
          <Groups />
        </Column>
      </Body>
    </div>
  );
};

export default Network;
