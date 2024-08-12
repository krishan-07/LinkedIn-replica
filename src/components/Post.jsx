import { useDispatch } from "react-redux";
import { useState } from "react";
import { postsActions } from "../store/features/post";
import { usersDataAction } from "../store/features/users";
import { CiMenuKebab } from "react-icons/ci";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import timeAgo from "../utility/timeaAgo";
import ProfileImg from "./ProfileImg";

export const Post = ({
  post,
  user,
  usersData,
  currUser,
  profileImg,
  currUserEmail,
}) => {
  const dispatch = useDispatch();
  const daysPostedAgo = timeAgo(post.date);
  const [comments, setComment] = useState(false);
  const [text, setText] = useState("");

  const handleLike = () => {
    if (!post.likes.likedBy.includes(currUserEmail)) {
      dispatch(
        postsActions.updateLike({
          postId: post.postId,
          userEmail: currUserEmail,
        })
      );
      if (post.email !== currUserEmail)
        dispatch(
          usersDataAction.pushNotification({
            id: post.email,
            data: {
              id: post.postId + currUserEmail,
              email: currUserEmail,
              type: "like",
              read: false,
              createdAt: new Date().toISOString(),
            },
          })
        );
    } else {
      dispatch(
        postsActions.removeLike({
          postId: post.postId,
          userEmail: currUserEmail,
        })
      );
      dispatch(
        usersDataAction.popNotification({
          postEmail: post.email,
          id: post.postId + currUserEmail,
        })
      );
    }
  };
  const toggleDropdown = (postId) => {
    const dropdownparent = document.querySelector(`[data-post-id="${postId}"]`);
    const dropdown = dropdownparent.querySelector(".dropdown-m");
    dropdown.classList.toggle("d-none");
  };
  const deletePost = () => {
    dispatch(postsActions.deletePost(post.postId));
  };
  const filterPost = (postId) => {
    const post = document.querySelector(`[data-post="${postId}"]`);
    post.classList.add("d-none");
  };
  const toggleComments = (postId) => {
    if (!comments) {
      document
        .querySelector(`[data-comments="${postId}"]`)
        .classList.remove("d-none");
      setComment(true);
    } else {
      document
        .querySelector(`[data-comments="${postId}"]`)
        .classList.add("d-none");
      setComment(false);
    }
  };
  const addComment = () => {
    dispatch(
      postsActions.addComment({
        postId: post.postId,
        data: {
          id: currUserEmail + new Date().toISOString(),
          email: currUserEmail,
          text,
          createdAt: new Date().toISOString(),
        },
      })
    );
    if (post.email !== currUserEmail)
      dispatch(
        usersDataAction.pushNotification({
          id: post.email,
          data: {
            id: post.email + new Date().toISOString(),
            email: currUserEmail,
            type: "comment",
            read: false,
            createdAt: new Date().toISOString(),
          },
        })
      );
    setText("");
  };
  return (
    <div className="feed-card mb-3 pb-3" data-post={post.postId}>
      <div className="d-flex align-items-center gap-3 m-0 px-3 py-2">
        {profileImg}
        <div className="d-flex flex-column mt-1">
          <p className="fw-m m-0" style={{ lineHeight: "15px" }}>
            {user.name}
          </p>
          <p
            className="text-secondary m-0 fs-s text-truncate"
            style={{ maxWidth: "200px" }}
          >
            {user.bio}
          </p>
          <p className="m-0 text-secondary" style={{ fontSize: " 0.7rem" }}>
            {daysPostedAgo}
          </p>
        </div>
        <div
          className="position-relative ms-auto"
          data-post-id={post.postId}
          onClick={() => {
            toggleDropdown(post.postId);
          }}
        >
          <div data-post-id={`${post.postId}`}>
            <div className="d-flex align-items-center">
              <CiMenuKebab />
            </div>
          </div>

          <div
            className="dropdown-m d-none"
            style={{
              top: "25px",
              width: "100px",
              borderRadius: "0px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {user.email === currUserEmail ? (
              <div className="py-1 px-2 cursor-p item" onClick={deletePost}>
                Delete post
              </div>
            ) : (
              <div
                className="py-1 px-2 cursor-p item"
                onClick={() => {
                  filterPost(post.postId);
                }}
              >
                Hide post
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="content-container px-3">{post.content}</div>
      {post.image && (
        <div className="post-photo-container mt-2">
          <img src={post.image} alt="img" />
        </div>
      )}
      <div className="my-3 fs-s px-3 d-flex align-items-center gap-1">
        <span className="d-flex align-items-end">
          <BiSolidLike size={15} />
        </span>
        <span className="lh-1">{post.likes.count} people liked this post</span>
      </div>
      <div className="row gx-2 px-3">
        <button
          className={`btn col mx-2 ${
            post.likes.likedBy.includes(currUserEmail) ? "btn-primary" : ""
          }`}
          id="like-btn"
          onClick={() => {
            handleLike();
          }}
        >
          <p className="d-flex align-items-center justify-content-center m-0 gap-2">
            <BiLike />
            {post.likes.likedBy.includes(currUserEmail) ? "Liked" : "Like"}
          </p>
        </button>
        <button
          className="btn col mx-2"
          onClick={() => {
            toggleComments(post.postId);
          }}
        >
          <p className="d-flex align-items-center justify-content-center m-0 gap-2">
            <FaRegCommentDots /> comment
          </p>
        </button>
      </div>
      <div className="comments px-3 d-none" data-comments={`${post.postId}`}>
        <div className="d-flex gap-2 mt-4 align-items-conter">
          <ProfileImg
            size={"42px"}
            name={currUser.userName}
            image={currUser.profileImg}
          />

          <input
            type="text"
            className="btn-apple w-75 px-3"
            placeholder="Add a comment"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className={`btn btn-light w-25 ${text === "" ? "disabled" : ""}`}
            style={{ width: "15%", borderRadius: "50px" }}
            onClick={addComment}
          >
            Post
          </button>
        </div>
        {post.comments.map((comment) => {
          const user = usersData.find((data) => data.email === comment.email);
          return (
            <div className="mt-4 d-flex gap-2" key={comment.id}>
              <div>
                <ProfileImg
                  size={"42px"}
                  name={user.userName}
                  image={user.profileImg}
                />
              </div>
              <div className="text px-3 py-2">
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <div className="fw-m">{user.name}</div>
                    <div className="text-secondary fs-s">
                      {timeAgo(comment.createdAt)}
                    </div>
                  </div>
                  <div className="text-secondary fs-s lh-1">
                    {user.bio.substring(0, 50) + "..."}
                  </div>
                </div>

                <div style={{ fontSize: ".9rem" }}>{comment.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Post;
