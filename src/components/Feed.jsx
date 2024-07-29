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
      <div className="profile-section position-sticky" style={{ top: "87px" }}>
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

export const Post = ({ post, user, currUser, profileImg, currUserEmail }) => {
  const dispatch = useDispatch();
  const daysPostedAgo = timeAgo(post.date);

  const handleLike = () => {
    if (!post.likes.likedBy.includes(currUserEmail)) {
      dispatch(
        postsActions.updateLike({
          postId: post.postId,
          userEmail: currUserEmail,
        })
      );
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
            {currUser && user.email === currUserEmail ? (
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
        <button className="btn col mx-2">
          <p className="d-flex align-items-center justify-content-center m-0 gap-2">
            <FaRegCommentDots /> comment
          </p>
        </button>
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
  const currUser = useSelector((state) => state.currUser);
  const user = usersData.find((user) => user.email === currUser);

  return (
    <>
      <Body>
        <Column className={"col-12 col-md-3 px-2 px-md-0"}>
          <FeedProfile user={user} posts={posts} />
        </Column>
        <Column className={"col-12 col-md-9 my-4 my-md-0 px-2 px-md-3"}>
          <div className="row">
            <Column className={"col-12 col-lg-8 pe-md-1"}>
              <PostInput user={user} />
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
                      currUser={currUser}
                      currUserEmail={currUser}
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
              <div className="position-sticky" style={{ top: "87px" }}>
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
