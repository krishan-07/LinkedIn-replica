import { useDispatch, useSelector } from "react-redux";
import { Body, Column, ProfileImg, timeAgo } from "./Utility";
import { notificationsActions } from "../store/features/notifications";

const card = {
  borderRadius: "6px",
  background: "white",
  overflow: "clip",
};

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);
  const usersData = useSelector((state) => state.usersData);
  const currUser = useSelector((state) => state.currUser);
  const dispatch = useDispatch();

  const markAsRead = (id) => {
    console.log("hiiii");
    dispatch(notificationsActions.markAsRead(id));
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
              <div className="my-3">
                {notifications.map((notification) => {
                  const user = usersData.find(
                    (data) => data.email === notification.email
                  );

                  return (
                    <div
                      className={`notification ${
                        notification.read ? "active" : ""
                      } px-3 cursor-p`}
                      key={notification.id}
                      onClick={() => {
                        markAsRead(notification.id);
                      }}
                    >
                      <ProfileImg
                        size={"40px"}
                        image={user.profileImg}
                        name={user.name}
                      />
                      {notification.type === "post" && (
                        <div className="ms-3">
                          {user.email === currUser ? "You" : user.name} created
                          a new post
                        </div>
                      )}
                      {notification.type === "like" && (
                        <div className="ms-3">
                          {user.email === currUser ? "You" : user.name} liked
                          your post
                        </div>
                      )}
                      {notification.type === "comment" && (
                        <div className="ms-3">
                          {user.email === currUser ? "You" : user.name}{" "}
                          commented your post
                        </div>
                      )}
                      <div className="ms-auto fs-s text-secondary">
                        {timeAgo(notification.createdAt)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Column>
      </Body>
    </>
  );
};

export default Notifications;
