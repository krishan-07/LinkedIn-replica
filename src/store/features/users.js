import defaultProfilePicture from "../../assets/defaultPfp.jpeg";
import defaultbanner from "../../assets/defaultBanner.svg";
import demoImg from "../../assets/demoimg.jpeg";
import banner from "../../assets/banner.jpeg";
import { createSlice } from "@reduxjs/toolkit";
import { formatDateToYYYYMMM } from "../../components/Utility";

const USERS_DATA = [
  {
    email: "krishan.mondal@gmail.com",
    userName: "sreekrishanmondal",
    name: "Sree Krishan Mondal",
    pronouns: "He/him",
    profileImg: demoImg,
    profileBanner: banner,
    bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
    skills: ["Web Development", "React"],
    location: "Hyderabad, Telangana, India",
    education: [
      {
        school: "keshav Memorial Institute of Commerce and Sciences",
        degree: "BCOM [Computer Applications]",
        from: "Apr 2022",
        to: "June 2025",
      },
    ],
    experience: [
      {
        companyName: "Cloud Counselage pvt. ltd.",
        type: "Internship",
        mode: "Remote",
        from: "June 2024",
        to: "present",
      },
    ],
    requests: ["jane.smith@example.com", "alice.jones@example.com"],
    connections: [],
  },
  {
    email: "john.doe@example.com",
    name: "John Doe",
    userName: "johndoe",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Software Engineer | Tech Enthusiast | Blogger",
    skills: ["JavaScript", "Node.js"],
    location: "Hyderabad, Telangana, India",
    education: [],
    experience: [],
    requests: [],
    connections: [],
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    userName: "janesmith",
    pronouns: "She/her",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Graphic Designer | Artist | Creative Thinker",
    skills: ["UI/UX Design", "Photoshop"],
    location: "Hyderabad, Telangana, India",
    education: [],
    experience: [],
    requests: [],
    connections: [],
  },
  {
    email: "alice.jones@example.com",
    name: "Alice Jones",
    userName: "alicejones",
    pronouns: "She/her",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Data Scientist | AI Researcher | Speaker",
    skills: ["Data Science", "Machine Learning"],
    location: "Hyderabad, Telangana, India",
    education: [],
    experience: [],
    requests: [],
    connections: [],
  },
  {
    email: "michael.brown@example.com",
    name: "Michael Brown",
    userName: "michaelbrown",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Entrepreneur | Innovator | Mentor",
    skills: ["Entrepreneurship", "Business Development"],
    location: "Hyderabad, Telangana, India",
    education: [],
    experience: [],
    requests: [],
    connections: [],
  },
  {
    email: "emma.white@example.com",
    name: "Emma White",
    userName: "emmawhite",
    pronouns: "She/her",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Photographer | Travel Blogger | Adventure Seeker",
    skills: ["Photography", "Travel Writing"],
    location: "Hyderabad, Telangana, India",
    education: [],
    experience: [],
    requests: [],
    connections: [],
  },
];

const usersData = createSlice({
  name: "usersData",
  initialState: USERS_DATA,
  reducers: {
    addUserData: (state) => {
      console.log(state);
    },
    updateUserData: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].name = data.name === "" ? state[index].name : data.name;
      state[index].pronouns =
        data.pronouns === "" ? state[index].pronouns : data.pronouns;
      state[index].bio = data.bio === "" ? state[index].bio : data.bio;
      state[index].location =
        data.location === "" ? state[index].location : data.location;
    },
    updateSkills: (state, action) => {
      const { id, skill } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].skills.push(skill);
    },
    deleteSkill: (state, action) => {
      const { id, skillIndex } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].skills.splice(skillIndex, 1);
    },
    updateEducation: (state, action) => {
      const { id, education } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].education.push(education);
    },
    deleteEducation: (state, action) => {
      const { id, eduIndex } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].education.splice(eduIndex, 1);
    },
    updateExperience: (state, action) => {
      const { id, exp, checkedData } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].experience.unshift(exp);

      if (checkedData.length !== 0) {
        checkedData.forEach((item) => {
          const i = state[index].experience.findIndex(
            (data) => data.companyName === item
          );
          state[index].experience[i].to = formatDateToYYYYMMM();
        });
      }
    },
    deleteExperience: (state, action) => {
      const { id, expIndex } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].experience.splice(expIndex, 1);
    },
    removeRequest: (state, action) => {
      const { id, email } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].requests = state[index].requests.filter(
        (request) => request !== email
      );
    },
    acceptRequest: (state, action) => {
      const { id, email } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].requests = state[index].requests.filter(
        (request) => request !== email
      );
      state[index].connections.push(email);
    },
    sendRequest: (state, action) => {
      const { id, email } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].requests.push(email);
    },
  },
});

export default usersData;
export const usersDataAction = usersData.actions;
