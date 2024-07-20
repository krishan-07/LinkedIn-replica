import { Body, Column, ProfileImg } from "./Utility.jsx";
import banner from "../assets/banner.jpeg";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import Footer from "./Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../store/features/createPostModal.js";
import { postsActions } from "../store/features/post.js";
import { Link } from "react-router-dom";

const card = {
  background: "white",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "7px",
};

const FeedProfile = () => {
  return (
    <>
      <div className="profile-section position-sticky" style={{ top: "85px" }}>
        <div className="banner-container">
          <img src={banner} alt="banner" />
        </div>
        <div className="position-relative">
          <div className="image-container position-absolute">
            <ProfileImg size={"100%"} />
          </div>
        </div>

        <div className="text-center profile-name">
          <Link
            to="/sree-krishan-mondal"
            className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m
        "
          >
            Sree krishan mondal
          </Link>
        </div>
        <div
          className="profile-desc text-secondary text-center mt-2"
          style={{ fontSize: ".8rem" }}
        >
          <p className="mb-2 px-2">
            Student | KMES | frontend developer | Contributor @ GSSoC'24
          </p>
          <div className="dropdown-divider my-4 d-none d-md-block"></div>
          <div className="mb-2 d-flex justify-content-between align-items-center px-2 fs-sm">
            <p className="m-0">Profile Views</p>
            <p className="text-primary fw-m m-0">26</p>
          </div>
          <div className="mb-5 d-flex justify-content-between align-items-center px-2 fs-sm">
            <p className="m-0">Posts</p>
            <p className="text-primary m-0 fw-m">2</p>
          </div>
        </div>
      </div>
    </>
  );
};

const PostInput = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createPostActions.openPopup());
  };
  return (
    <>
      <div className="mb-4" style={card}>
        <div className="d-flex p-3 gap-3 ">
          <ProfileImg size={"50px"} />
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

const Post = ({ name, bio, content, imgUrl, likes, profileImg, postId }) => {
  const [like, setLike] = useState({
    text: "Like",
    btnColor: "primary",
  });
  const [follow, setFollow] = useState("Follow");
  const dispatch = useDispatch();

  const handleLike = () => {
    like.text === "Like"
      ? setLike({ text: "Liked", btnColor: "btn-primary" })
      : setLike({
          text: "Like",
          btnColor: "",
        });

    like.text === "Liked"
      ? dispatch(postsActions.removeLike(postId))
      : dispatch(postsActions.updateLike(postId));
  };

  const handleFollow = () => {
    follow === "Follow" ? setFollow("Following") : setFollow("Follow");
  };

  return (
    <div className="mb-3 pb-3" style={card}>
      <div className="d-flex align-items-center gap-3 m-0 px-3 py-2">
        {profileImg}
        <div className="d-flex flex-column">
          <p className="fw-m m-0">{name}</p>
          <p
            className="text-secondary m-0 fs-s text-truncate"
            style={{ maxWidth: "300px" }}
          >
            {bio}
          </p>
        </div>
        <button
          className="btn text-primary ms-auto"
          onClick={() => {
            handleFollow();
          }}
        >
          {follow}
        </button>
      </div>
      <div className="content-container px-3">{content}</div>
      {imgUrl && (
        <div className="post-photo-container mt-2">
          <img src={imgUrl} alt="img" />
        </div>
      )}
      <div className="my-3 fs-s px-3 d-flex align-items-center gap-1">
        <span className="d-flex align-items-end">
          <BiSolidLike size={15} />
        </span>
        <span className="lh-1">{likes} people liked this post</span>
      </div>
      <div className="row gx-2 px-3">
        <button
          className={`btn col mx-2 ${like.btnColor} `}
          onClick={() => {
            handleLike();
          }}
        >
          <p className="d-flex align-items-center justify-content-center m-0 gap-2">
            <BiLike /> {like.text}
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

  return (
    <>
      <Body>
        <Column className={"col-12 col-md-3 px-5 px-md-0"}>
          <FeedProfile />
        </Column>
        <Column className={"col-12 col-md-9 my-4 my-md-0 px-5 px-md-3"}>
          <div className="row">
            <Column className={"col-12 col-lg-8 pe-md-1"}>
              <PostInput />
              {posts.map((post) => {
                const user = usersData.find(
                  (user) => user.email === post.email
                );
                if (user) {
                  return (
                    <Post
                      key={post.postId}
                      name={user.name}
                      bio={user.Bio}
                      content={post.content}
                      imgUrl={post.image}
                      likes={post.likes}
                      postId={post.postId}
                      profileImg={
                        <ProfileImg
                          size={"50px"}
                          image={user.profileImg}
                          name={user.name}
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
              <div className="position-sticky" style={{ top: "85px" }}>
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
