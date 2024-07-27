import { createSlice } from "@reduxjs/toolkit";
import defaultImage from "../../assets/group.jpeg";
import defaultBanner from "../../assets/groupBanner.jpeg";

const initialState = [
  {
    id: 1,
    name: "Machine Learning, Artificial Intelligence, Deep Learning, Computer Vision, Robotics, DataOps, Gen AI",
    image: defaultImage,
    banner: defaultBanner,
    members: 200000,
    joined: false,
  },
  {
    id: 2,
    name: "Web Development, JavaScript, React, Node.js, CSS, HTML",
    image: defaultImage,
    banner: defaultBanner,
    members: 150000,
    joined: false,
  },
  {
    id: 3,
    name: "Cybersecurity, Ethical Hacking, Network Security, Cryptography",
    image: defaultImage,
    banner: defaultBanner,
    members: 50000,
    joined: false,
  },
  {
    id: 4,
    name: "Data Science, Statistics, Data Analysis, Data Visualization, R, Python",
    image: defaultImage,
    banner: defaultBanner,
    members: 120000,
    joined: false,
  },
  {
    id: 5,
    name: "Blockchain, Cryptocurrency, Smart Contracts, Ethereum, Bitcoin",
    image: defaultImage,
    banner: defaultBanner,
    members: 80000,
    joined: false,
  },
  {
    id: 6,
    name: "Cloud Computing, AWS, Azure, Google Cloud, DevOps, Kubernetes",
    image: defaultImage,
    banner: defaultBanner,
    members: 100000,
    joined: false,
  },
];

const groups = createSlice({
  name: "groups",
  initialState,
  reducers: {
    joined: (state, action) => {
      const i = state.findIndex((obj) => obj.id === action.payload);
      state[i].joined = true;
    },
    leave: (state, action) => {
      const i = state.findIndex((obj) => obj.id === action.payload);
      state[i].joined = false;
    },
  },
});

export default groups;
export const groupsActions = groups.actions;
