import React from "react";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";
import Column from "./Column";
import ProfileImg from "./ProfileImg";
import { Link } from "react-router-dom";

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
      <div className="network-card pt-2 mb-4" data-testid="findPeople">
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

                  <div className="mx-4 mb-3" data-testid="button">
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
export default FindPeople;
