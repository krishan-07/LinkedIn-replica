import React from "react";
import { useDispatch } from "react-redux";
import { createPostActions } from "../store/features/createPostModal";
import Post from "./Post";
import ProfileImg from "./ProfileImg";

const ProfilePosts = ({
  user,
  usersData,
  isCurrUser,
  posts,
  currUserEmail,
  currUserData,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createPostActions.openPopup());
  };

  return (
    <div className="profile-card px-2 px-md-4 py-2 py-md-4 mt-2">
      <div className="d-flex mb-4 justify-centent-between align-items-center mx-2 mx-md-0 my-1 my-md-0">
        {isCurrUser ? (
          <>
            <h6 className="w-100">My Activity</h6>
            <button
              className="btn-google fw-m justify-content-center text-secondary post-input w-50"
              onClick={handleClick}
            >
              Add Post
            </button>
          </>
        ) : (
          <h6 className="w-100">Posts</h6>
        )}
      </div>
      <div className="row mt-3">
        <div className="col col-lg-9">
          {posts.map((post) => {
            if (post.email === user.email) {
              return (
                <div
                  className="col mb-2 pt-1"
                  key={post.postId}
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "7px",
                  }}
                >
                  <Post
                    post={post}
                    user={user}
                    usersData={usersData}
                    currUser={currUserData}
                    currUserEmail={currUserEmail}
                    profileImg={
                      <ProfileImg
                        size={"50px"}
                        image={user.profileImg}
                        name={user.userName}
                      />
                    }
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
export default ProfilePosts;
