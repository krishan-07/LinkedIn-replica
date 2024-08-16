import React from "react";
import { useDispatch } from "react-redux";
import { createPostActions } from "../store/features/createPostModal";
import ProfileImg from "./ProfileImg";

const PostInput = ({ user }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createPostActions.openPopup());
  };
  return (
    <>
      <div className="feed-card mb-4" data-testid="post-input">
        <div className="d-flex p-3 gap-3 ">
          <ProfileImg
            size={"50px"}
            image={user.profileImg}
            name={user.userName}
          />
          <button
            className="btn-apple fw-m justify-content-start ps-3 text-secondary post-input"
            onClick={handleClick}
          >
            Start a post
          </button>
        </div>
      </div>
    </>
  );
};
export default PostInput;
