import defaultProfilePicture from "../../assets/defaultPfp.jpeg";
import defaultbanner from "../../assets/defaultBanner.svg";
import demoImg from "../../assets/demoimg.jpeg";
import banner from "../../assets/banner.jpeg";
import { createSlice } from "@reduxjs/toolkit";

const USERS_DATA = [
  {
    email: "krishan.mondal@gmail.com",
    name: "Sree Krishan Mondal",
    pronouns: "He/him",
    profileImg: demoImg,
    profileBanner: banner,
    bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24",
    skills: ["Web Development", "React"],
    location: "Hyderabad, Telangana, India",
    connections: 65,
    education: [
      {
        name: "keshav Memorial Institute of Commerce and Sciences",
        from: "Apr 2022",
        to: "June 2025",
      },
    ],
    experience: [
      {
        companyName: "Cloud Counselage pvt. ltd.",
        type: "Internship",
        from: "June 2024",
        to: "present",
      },
    ],
  },
  {
    email: "john.doe@example.com",
    name: "John Doe",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Software Engineer | Tech Enthusiast | Blogger",
    skills: ["JavaScript", "Node.js"],
    location: "Hyderabad, Telangana, India",
    connections: 65,
    education: [],
    experience: [],
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    pronouns: "She/her",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Graphic Designer | Artist | Creative Thinker",
    skills: ["UI/UX Design", "Photoshop"],
    location: "Hyderabad, Telangana, India",
    connections: 65,
    education: [],
    experience: [],
  },
  {
    email: "alice.jones@example.com",
    name: "Alice Jones",
    pronouns: "She/her",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Data Scientist | AI Researcher | Speaker",
    skills: ["Data Science", "Machine Learning"],
    location: "Hyderabad, Telangana, India",
    connections: 65,
    education: [],
    experience: [],
  },
  {
    email: "michael.brown@example.com",
    name: "Michael Brown",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Entrepreneur | Innovator | Mentor",
    skills: ["Entrepreneurship", "Business Development"],
    location: "Hyderabad, Telangana, India",
    connections: 65,
    education: [],
    experience: [],
  },
  {
    email: "emma.white@example.com",
    name: "Emma White",
    pronouns: "She/her",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Photographer | Travel Blogger | Adventure Seeker",
    skills: ["Photography", "Travel Writing"],
    location: "Hyderabad, Telangana, India",
    connections: 65,
    education: [],
    experience: [],
  },
];

const usersData = createSlice({
  name: "usersData",
  initialState: USERS_DATA,
  reducers: {
    addUserData: (state) => {
      console.log(state);
    },
  },
});

export default usersData;
export const usersDataAction = usersData.actions;
