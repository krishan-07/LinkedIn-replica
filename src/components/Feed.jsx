import { Body, Column } from "./Body";
import demoImg from "../assets/demoimg.jpeg";
import banner from "../assets/banner.jpeg";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import Footer from "./Footer.jsx";
import { useDispatch } from "react-redux";
import { createPostModalActions } from "../store/features/createPostModal.js";

const card = {
  background: "white",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "7px",
};

export const ProfileImg = ({ size }) => {
  return (
    <a href="/sree-krishan-mondal">
      <img
        src={demoImg}
        alt="Profile picture"
        style={{ height: `${size}`, width: `${size}`, borderRadius: "50px" }}
      />
    </a>
  );
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
          <a
            href="/sree-krishan-mondal"
            className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m
        "
          >
            Sree krishan mondal
          </a>
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
    dispatch(createPostModalActions.openPopup());
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

const Post = () => {
  const [like, setLike] = useState({
    text: "Like",
    btnColor: "primary",
  });
  const [follow, setFollow] = useState("Follow");

  const handleLike = () => {
    like.text === "Like"
      ? setLike({ text: "Liked", btnColor: "btn-primary" })
      : setLike({
          text: "Like",
          btnColor: "",
        });
  };
  const handleFollow = () => {
    follow === "Follow" ? setFollow("Following") : setFollow("Follow");
  };
  return (
    <div className="mb-3 pb-3" style={card}>
      <div className="d-flex align-items-center gap-3 m-0 px-3 py-2">
        <ProfileImg size={"50px"} />
        <div className="d-flex flex-column">
          <p className="fw-m m-0">Sree krishan mondal</p>
          <p
            className="text-secondary m-0 fs-s text-truncate"
            style={{ maxWidth: "300px" }}
          >
            Student | KMES | frontend developer | Contributor @ GSSoC'24
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
      <div className="content-container mb-3 px-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, labore?
        Corrupti tempore aperiam tenetur harum ad quo adipisci! Enim veniam vel
      </div>
      <div className="post-photo-container">
        <img
          src="https://images.unsplash.com/photo-1721069209981-d7b9081dfa42?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="img"
        />
      </div>
      <div className="my-3 fs-s px-3">
        <BiSolidLike /> 23 people liked this post
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
              <Post />
              <Post />
              <Post />
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
