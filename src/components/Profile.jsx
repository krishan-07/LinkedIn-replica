import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileEdit } from "../store/features/profileEditPopup";
import { useState } from "react";
import ProfilePictureEditPopup from "./ProfilePictureEditPopup";
import ProfilePictureViewPopup from "./ProfilePictureViewPopup";
import ProfileEditEducationPopup from "./ProfileEditEducationPopup";
import ProfileEditExperiencePopup from "./ProfileEditExperiencePopup";
import ProfileEditSkillsPopup from "./ProfileEditSkillsPopup";
import ProfileEditUserDataPopup from "./ProfileEditUserDataPopup";
import ProfilePosts from "./ProfilePosts";
import ProfileSkillsSection from "./ProfileSkillSection";
import ProfileEducationSection from "./ProfileEducationSection";
import ProfileExperienceSection from "./ProfileExperienceSection";
import ProfileBanner from "./ProfileBanner";
import Body from "./Body";
import Column from "./Column";

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
        <ProfileEditUserDataPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.skills && (
        <ProfileEditSkillsPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.education && (
        <ProfileEditEducationPopup user={currUserData} close={close} />
      )}
      {editPopup && allowPopup.experience && (
        <ProfileEditExperiencePopup user={currUserData} close={close} />
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
          <ProfilePosts
            usersData={usersData}
            user={user}
            posts={posts}
            isCurrUser={isCurrUser}
            currUserEmail={currUserEmail}
            currUserData={currUserData}
          />
        </Column>
        <Column className={"col-12 col-md-3 px-2 px-md-0"}>
          <ProfileSkillsSection
            user={user}
            open={open}
            isCurrUser={isCurrUser}
          />
          <ProfileEducationSection
            user={user}
            open={open}
            isCurrUser={isCurrUser}
          />
          <ProfileExperienceSection
            user={user}
            open={open}
            isCurrUser={isCurrUser}
          />
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
