import { useDispatch } from "react-redux";
import { ProfileImg } from "./Utility";
import { createPostActions } from "../store/features/createPostModal";

const PostInput = ({ user }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createPostActions.openPopup());
  };
  return (
    <>
      <div className="feed-card mb-4">
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
