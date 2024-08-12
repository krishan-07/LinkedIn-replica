import defaultProfilePicture from "../../assets/defaultPfp.jpeg";
import defaultbanner from "../../assets/defaultBanner.svg";
import demoImg from "../../assets/demoimg.jpeg";
import banner from "../../assets/banner.jpeg";
import { createSlice } from "@reduxjs/toolkit";
import formatDateToYYYYMMM from "../../utility/formatDateToYYYYMMM";
const USERS_DATA = [
  {
    email: "krishan.mondal@gmail.com",
    password: "12345678",
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
    requests: ["john.doe@example.com"],
    connections: ["jane.smith@example.com"],
    notifications: [
      {
        id: "john.doe@example.com2024-07-21T08:22:54.783Z",
        email: "john.doe@example.com",
        type: "message",
        read: false,
        createdAt: "2024-07-21T08:22:54.783Z",
      },
      {
        id: 1,
        email: "john.doe@example.com",
        type: "like",
        read: true,
        createdAt: "2024-07-21T08:22:54.783Z",
      },
      {
        id: "john.doe@example.com",
        email: "john.doe@example.com",
        type: "connection",
        read: true,
        createdAt: "2024-07-21T08:22:54.783Z",
      },
    ],
  },
  {
    email: "john.doe@example.com",
    password: "12345678",
    userName: "johndoe",
    name: "John Doe",
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
    notifications: [
      {
        id: 2,
        email: "krishan.mondal@gmail.com",
        type: "message",
        read: true,
        createdAt: "2024-07-21T08:22:54.783Z",
      },
      {
        id: 1,
        email: "jane.smith@example.com",
        type: "comment",
        read: true,
        createdAt: "2024-07-05T14:23:35.000Z",
      },
    ],
  },
  {
    email: "jane.smith@example.com",
    password: "12345678",
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
    connections: ["krishan.mondal@gmail.com"],
    notifications: [],
  },
  {
    email: "alice.jones@example.com",
    password: "12345678",
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
    notifications: [],
  },
  {
    email: "michael.brown@example.com",
    password: "12345678",
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
    notifications: [],
  },
  {
    email: "emma.white@example.com",
    password: "12345678",
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
    notifications: [],
  },
];

const usersData = createSlice({
  name: "usersData",
  initialState: USERS_DATA,
  reducers: {
    addUserData: (state, action) => {
      state.push({
        ...action.payload,
        pronouns: "",
        profileImg: defaultProfilePicture,
        profileBanner: defaultbanner,
        bio: "",
        skills: [],
        location: "",
        education: [],
        experience: [],
        requests: [],
        connections: [],
        notifications: [],
      });
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
    updateProfilePicture: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((obj) => obj.email === id);
      state[index].profileImg = action.payload.imgUrl;
    },
    removeRequest: (state, action) => {
      const { id, email } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].requests = state[index].requests.filter(
        (request) => request !== email
      );
    },
    acceptRequest: (state, action) => {
      const { currUserEmail, userEmail } = action.payload;
      const index = state.findIndex((user) => user.email === currUserEmail);
      const i = state.findIndex((user) => user.email === userEmail);

      state[index].requests = state[index].requests.filter(
        (request) => request !== userEmail
      );
      state[index].connections.push(userEmail);
      state[i].connections.push(currUserEmail);
    },
    sendRequest: (state, action) => {
      const { id, email } = action.payload;
      const index = state.findIndex((user) => user.email === id);

      state[index].requests.push(email);
    },
    pushNotification: (state, action) => {
      const { id, data } = action.payload;

      if (data.type === "post") {
        state.forEach((obj) => {
          if (obj.email !== id) {
            if (obj.connections.includes(id)) {
              obj.notifications.unshift(data);
            }
          }
        });
      } else {
        state.forEach((obj) => {
          if (obj.email === id) {
            obj.notifications.unshift(data);
          }
        });
      }
    },
    popNotification: (state, action) => {
      const { id, postEmail } = action.payload;

      state.forEach((obj) => {
        if (obj.email === postEmail) {
          const a = obj.notifications.filter(
            (notification) => notification.id !== id
          );
          obj.notifications = a;
        }
      });
    },
    markAsRead: (state, action) => {
      const { userEmail, id } = action.payload;
      const index = state.findIndex((obj) => obj.email === userEmail);
      const i = state[index].notifications.findIndex((obj) => obj.id === id);

      state[index].notifications[i].read = true;
    },
  },
});

export default usersData;
export const usersDataAction = usersData.actions;
