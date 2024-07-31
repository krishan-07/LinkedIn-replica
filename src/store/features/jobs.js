import { createSlice } from "@reduxjs/toolkit";
import defaultImg from "./../../assets/company_logo.jpeg";
const initialState = [
  {
    id: 1,
    jobName: "Frontend Developer",
    companyName: "Tech Innovators Inc.",
    type: "Full-time",
    location: "San Francisco, CA",
    logo: defaultImg,
  },
  {
    id: 2,
    jobName: "Backend Developer",
    companyName: "Cloud Solutions Ltd.",
    type: "Part-time",
    location: "New York, NY",
    logo: defaultImg,
  },
  {
    id: 3,
    jobName: "Data Scientist",
    companyName: "Analytics Pros",
    type: "Remote",
    location: "Austin, TX",
    logo: defaultImg,
  },
  {
    id: 4,
    jobName: "UI/UX Designer",
    companyName: "Creative Minds Co.",
    type: "Contract",
    location: "Seattle, WA",
    logo: defaultImg,
  },
  {
    id: 5,
    jobName: "DevOps Engineer",
    companyName: "NextGen Technologies",
    type: "Full-time",
    location: "Chicago, IL",
    logo: defaultImg,
  },
];

const jobs = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action) => {
      console.log(state);
    },
  },
});

export default jobs;
export const jobsActions = jobs.actions;
