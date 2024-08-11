import { Body, Column, ProfileImg } from "./Utility";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaPen, FaPlus } from "react-icons/fa6";
import { Post } from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../store/features/createPostModal";
import {
  EditEducationPopup,
  EditExperiencePopup,
  EditSkillsPopup,
  EditUserDataPopup,
} from "./ProfileEditorPopup";
import { profileEdit } from "../store/features/profileEditPopup";
import { useState } from "react";
import { usersDataAction } from "../store/features/users";
import ProfilePictureEditPopup from "./ProfilePictureEditPopup";
import ProfilePictureViewPopup from "./ProfilePictureViewPopup";
import { messagesActions } from "../store/features/messages";

const card = {
  background: "white",
  borderRadius: "7px",
};

const ProfileBanner = ({ user, open, isCurrUser, currUserData }) => {
  const openPopup = () => {
    open("profile");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = (email) => {
    dispatch(
      usersDataAction.sendRequest({
        id: email,
        email: currUserData.email,
      })
    );
    dispatch(
      usersDataAction.pushNotification({
        id: email,
        data: {
          id: currUserData.email,
          email: currUserData.email,
          type: "connection",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  const acceptRequest = (email) => {
    dispatch(
      usersDataAction.acceptRequest({
        currUserEmail: currUserData.email,
        userEmail: email,
      })
    );
    dispatch(
      usersDataAction.pushNotification({
        id: email,
        data: {
          id: currUserData.email + "/acr", //acr: accepted connection request
          email: currUserData.email,
          type: "connectionAccepted",
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );
  };
  const editProfilePicture = () => {
    open("pfp");
  };
  const viewProfilePicture = () => {
    open("viewPfp");
  };
  const addMessage = (userEmail, userName) => {
    dispatch(
      messagesActions.addMessage({
        currUser: currUserData.email,
        userEmail,
        userName,
      })
    );
    navigate(`/in/messaging/${userName}`);
  };

  return (
    <div className="profile-section w-100 position-relative pb-2">
      <div className="banner-container">
        <img src={user.profileBanner} alt="banner" />
      </div>
      <div className="position-relative">
        <div
          className="position-absolute profile-image-container cursor-p"
          onClick={isCurrUser ? editProfilePicture : viewProfilePicture}
        >
          <ProfileImg
            size={"100%"}
            image={user.profileImg}
            name={user.userName}
            disable={true}
          />
        </div>
      </div>
      <div className="space-container"></div>

      <div className="ms-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className="fw-m fs-l mt-2">{user.name}</span>
            {user.pronouns.length !== 0 && (
              <span className="text-secondary align-self-end mb-1 ps-2">
                {`(${user.pronouns})`}
              </span>
            )}
          </div>
          {isCurrUser && (
            <div className="me-3 cursor-p" onClick={openPopup}>
              <FaPen size={15} />
            </div>
          )}
          {!isCurrUser && !currUserData.connections.includes(user.email) && (
            <div className="me-3">
              {user.requests.includes(currUserData.email) && (
                <button
                  className="btn-disabled px-3 py-2 fs-s"
                  style={{ transform: "translateY(25%)" }}
                >
                  Requested
                </button>
              )}
              {currUserData.requests.includes(user.email) && (
                <button
                  className="btn-disabled px-3 py-2 fs-s"
                  style={{ transform: "translateY(25%)" }}
                  onClick={() => {
                    acceptRequest(user.email);
                  }}
                >
                  Accept
                </button>
              )}
              {!user.requests.includes(currUserData.email) &&
                !currUserData.requests.includes(user.email) && (
                  <button
                    className="btn-view-profile px-3 py-2 fs-s"
                    style={{ transform: "translateY(25%)" }}
                    onClick={() => {
                      sendRequest(user.email);
                    }}
                  >
                    Connect
                  </button>
                )}
            </div>
          )}
          {!isCurrUser && currUserData.connections.includes(user.email) && (
            <div className="me-3">
              <button
                className="btn-disabled px-3 py-2 fs-s"
                style={{ transform: "translateY(25%)" }}
                onClick={() => {
                  addMessage(user.email, user.userName);
                }}
              >
                Message
              </button>
            </div>
          )}
        </div>
        <div className="lh-1 col-9">
          <p className="mb-2 ">{user.bio}</p>
        </div>
        <div className="mt-1">
          <p className="m-0 text-secondary fs-s">{user.location}</p>
        </div>
        <div>
          <Link
            to="#"
            className="link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          >
            {user.connections.length} connections
          </Link>
        </div>
      </div>
    </div>
  );
};

const MyPosts = ({
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
    <div className="px-2 px-md-4 py-2 py-md-4 mt-2" style={card}>
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

const SkillsSection = ({ user, open, isCurrUser }) => {
  const openPopup = () => {
    open("skills");
  };
  return (
    <div className="p-3 mb-2" style={card}>
      <div className="d-flex justify-content-between mb-1">
        <div className="h5">Skills</div>
        {isCurrUser && (
          <div className="me-1 cursor-p" onClick={openPopup}>
            <FaPlus size={15} />
          </div>
        )}
      </div>

      {user.skills.length > 0 ? (
        <div
          className="mb-3"
          style={{ minHeight: "80px", overflow: "auto", maxHeight: "120px" }}
        >
          {user.skills.map((skill) => (
            <div key={skill}>{skill}</div>
          ))}
        </div>
      ) : isCurrUser ? (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          Add skills
        </div>
      ) : (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          No skills
        </div>
      )}
    </div>
  );
};

const EducationSection = ({ user, open, isCurrUser }) => {
  const openPopup = () => {
    open("education");
  };
  return (
    <div className="p-3 mb-2" style={card}>
      <div className="d-flex justify-content-between mb-1">
        <div className="h5">Education</div>
        {isCurrUser && (
          <div className="me-1 cursor-p" onClick={openPopup}>
            <FaPlus size={15} />
          </div>
        )}
      </div>

      {user.education.length > 0 ? (
        <div
          className="mb-3"
          style={{ minHeight: "80px", overflow: "auto", maxHeight: "150px" }}
        >
          {user.education.map((obj) => (
            <div key={obj.school} className="mb-3">
              <div>{obj.school}</div>
              <div className="text-secondary fs-s">
                {obj.from} - {obj.to}
              </div>
            </div>
          ))}
        </div>
      ) : isCurrUser ? (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          Add Education
        </div>
      ) : (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          No Education
        </div>
      )}
    </div>
  );
};

const ExperienceSection = ({ user, open, isCurrUser }) => {
  const openPopup = () => {
    open("experience");
  };
  return (
    <div className="p-3" style={card}>
      <div className="d-flex justify-content-between mb-1">
        <div className="h5">Experience</div>
        {isCurrUser && (
          <div className="me-1 cursor-p" onClick={openPopup}>
            <FaPlus size={15} />
          </div>
        )}
      </div>

      {user.experience.length > 0 ? (
        <div
          className="mb-3"
          style={{ minHeight: "80px", overflow: "auto", maxHeight: "150px" }}
        >
          {user.experience.map((obj) => (
            <div key={obj.companyName} className="mb-3">
              <p className="m-0 lh-1">{obj.companyName}</p>
              <span className="fst-italic fs-s text-dark">{obj.type}</span>
              <span className="mx-1">-</span>
              <span className="fst-italic fs-s text-dark">{obj.mode}</span>
              <div className="text-secondary fs-s">
                {obj.from} - {obj.to}
              </div>
            </div>
          ))}
        </div>
      ) : isCurrUser ? (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          Add Experience
        </div>
      ) : (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          No Experience
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const usersData = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const currUserData = usersData.find((user) => user.email === currUserEmail);

  const userEmail = useLoaderData();
  const user = usersData.find((user) => user.email === userEmail);
  const isCurrUser = user.email === currUserEmail;

  const editPopup = useSelector((state) => state.profilePopup);
  const [allowPopup, setAllowPopup] = useState({
    profile: false,
    skills: false,
    education: false,
    experience: false,
    pfp: false,
    viewPfp: false,
  });

  const open = (name) => {
    dispatch(profileEdit.openPopup());
    setAllowPopup({
      ...allowPopup,
      [name]: true,
    });
  };
  const close = (name) => {
    dispatch(profileEdit.closePopup());
    setAllowPopup({
      ...allowPopup,
      [name]: false,
    });
  };

  return (
    <div style={{ height: "100%" }}>
      {editPopup && allowPopup.profile && (
        <EditUserDataPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.skills && (
        <EditSkillsPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.education && (
        <EditEducationPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.experience && (
        <EditExperiencePopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.pfp && (
        <ProfilePictureEditPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.viewPfp && (
        <ProfilePictureViewPopup user={user} close={close} />
      )}
      <Body>
        <Column className={"col-12 col-md-9 my-4 my-md-0 px-2 px-md-5 px-md-3"}>
          <ProfileBanner
            user={user}
            open={open}
            isCurrUser={isCurrUser}
            currUserData={currUserData}
          />
          <MyPosts
            usersData={usersData}
            user={user}
            posts={posts}
            isCurrUser={isCurrUser}
            currUserEmail={currUserEmail}
            currUserData={currUserData}
          />
        </Column>
        <Column className={"col-12 col-md-3 px-2 px-md-0"}>
          <SkillsSection user={user} open={open} isCurrUser={isCurrUser} />
          <EducationSection user={user} open={open} isCurrUser={isCurrUser} />
          <ExperienceSection user={user} open={open} isCurrUser={isCurrUser} />
        </Column>
      </Body>
    </div>
  );
};

export const Loader =
  (store) =>
  async ({ params }) => {
    const state = store.getState();
    const usersData = state.usersData;
    const user = usersData.find((data) =>
      params.userName.includes(data.userName)
    );
    return user.email;
  };

export default Profile;
