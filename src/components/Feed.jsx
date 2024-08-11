import { Body, Column, ProfileImg, timeAgo } from "./Utility.jsx";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import Footer from "./Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../store/features/createPostModal.js";
import { postsActions } from "../store/features/post.js";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { usersDataAction } from "../store/features/users.js";
import { useState } from "react";

const card = {
  background: "white",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "7px",
};

const FeedProfile = ({ user, posts }) => {
  return (
    <>
      <div className="profile-section position-sticky" style={{ top: "95px" }}>
        <div className="banner-container">
          <img src={user.profileBanner} alt="banner" />
        </div>
        <div className="position-relative">
          <div className="image-container position-absolute">
            <ProfileImg
              size={"100%"}
              image={user.profileImg}
              name={user.userName}
            />
          </div>
        </div>

        <div className="text-center profile-name">
          <Link
            to={`/in/${user.userName}`}
            className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m
        "
          >
            {user.name}
          </Link>
        </div>
        <div
          className="profile-desc text-secondary text-center mt-2"
          style={{ fontSize: ".8rem" }}
        >
          <p className="mb-2 px-2">{user.bio}</p>
          <div className="dropdown-divider my-4 d-none d-md-block"></div>
          <div className="mb-2 d-flex justify-content-between align-items-center px-2 fs-sm">
            <p className="m-0">Connections</p>
            <p className="text-primary fw-m m-0">{user.connections.length}</p>
          </div>
          <div className="mb-5 d-flex justify-content-between align-items-center px-2 fs-sm">
            <p className="m-0">Posts</p>
            <p className="text-primary m-0 fw-m">
              {posts.filter((post) => post.email === user.email).length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const PostInput = ({ user }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createPostActions.openPopup());
  };
  return (
    <>
      <div className="mb-4" style={card}>
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
    <div className="mb-3 pb-3" style={card} data-post={post.postId}>
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

const News = () => {
  return (
    <>
      <div className="d-flex flex-column" style={card}>
        <div className="text-center fw-m my-3">Top New for you</div>
        <div
          className="px-2 my-2 d-flex align-items-center justify-content-center text-secondary"
          style={{ height: "100px" }}
        >
          No news today
        </div>
      </div>
    </>
  );
};

const Feed = () => {
  const posts = useSelector((state) => state.posts);
  const usersData = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const currUser = usersData.find((user) => user.email === currUserEmail);

  return (
    <>
      <Body>
        <Column className={"col-12 col-md-3 px-2 px-md-0"}>
          <FeedProfile user={currUser} posts={posts} />
        </Column>
        <Column className={"col-12 col-md-9 my-4 my-md-0 px-2 px-md-3"}>
          <div className="row">
            <Column className={"col-12 col-lg-8 pe-md-1"}>
              <PostInput user={currUser} />
              {posts.map((post) => {
                const user = usersData.find(
                  (user) => user.email === post.email
                );
                if (user) {
                  return (
                    <Post
                      key={post.postId}
                      post={post}
                      user={user}
                      usersData={usersData}
                      currUser={currUser}
                      currUserEmail={currUserEmail}
                      profileImg={
                        <ProfileImg
                          size={"50px"}
                          image={user.profileImg}
                          name={user.userName}
                        />
                      }
                    />
                  );
                }
                return null;
              })}
            </Column>
            <Column className={"col-12 col-lg-4 pe-md-0"}>
              <News />
              <div className="footer position-sticky" style={{ top: "95px" }}>
                <Footer className="fs-s py-1" />
              </div>
            </Column>
          </div>
        </Column>
      </Body>
    </>
  );
};

export default Feed;
