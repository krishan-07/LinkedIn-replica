import { useDispatch, useSelector } from "react-redux";
import { Body, Column, ProfileImg, timeAgo } from "./Utility";
import { usersDataAction } from "../store/features/users";
import { TbGhost3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const card = {
  borderRadius: "6px",
  background: "white",
  overflow: "clip",
};

const Notifications = () => {
  const usersData = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const currUser = usersData.find((user) => user.email === currUserEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (type) => {
    if (type === "connection") navigate("/in/mynetwork");
  };
  const markAsRead = (id) => {
    dispatch(
      usersDataAction.markAsRead({
        userEmail: currUserEmail,
        id,
      })
    );
  };

  return (
    <>
      <Body>
        <Column className={"col-12 col-md-9"}>
          <div style={{ height: "100dvh" }}>
            <div className="px-3 py-2 my-3" style={card}>
              <div className="h4">Top Notifications</div>
            </div>
            <div style={card}>
              {currUser.notifications.length !== 0 ? (
                <div className="my-3">
                  {currUser.notifications.map((obj) => {
                    const user = usersData.find(
                      (data) => data.email === obj.email
                    );
                    return (
                      <div
                        className={`notification ${
                          obj.read ? "active" : ""
                        } px-3 cursor-p`}
                        key={obj.id}
                        onClick={() => {
                          markAsRead(obj.id);
                          handleNavigate(obj.type);
                        }}
                      >
                        <ProfileImg
                          size={"40px"}
                          image={user.profileImg}
                          name={user.userName}
                        />
                        {obj.type === "post" && (
                          <div className="ms-3">
                            {user.name}
                            <span className="m-0 ms-1">
                              created a new post.
                            </span>
                          </div>
                        )}
                        {obj.type === "like" && (
                          <div className="ms-3">
                            {obj.email === currUser.email ? "You" : user.name}
                            <span className="m-0 ms-1">liked your post.</span>
                          </div>
                        )}
                        {obj.type === "connection" && (
                          <div className="ms-3">
                            {user.name} sent you a connection request.
                          </div>
                        )}
                        {obj.type === "connectionAccepted" && (
                          <div className="ms-3">
                            {user.name} accepted your connection request.
                          </div>
                        )}
                        {obj.type === "comment" && (
                          <div className="ms-3">
                            {user.name}
                            commented your post.
                          </div>
                        )}
                        <div className="ms-auto fs-s text-secondary">
                          {timeAgo(obj.createdAt)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "50dvh", background: "#f3f2f0" }}
                >
                  <div className="text-secondary">
                    <TbGhost3 size={30} />
                  </div>
                  <div className="text-secondary fst-italic fs-m">
                    No new notifications
                  </div>
                </div>
              )}
            </div>
          </div>
        </Column>
      </Body>
    </>
  );
};

export default Notifications;
