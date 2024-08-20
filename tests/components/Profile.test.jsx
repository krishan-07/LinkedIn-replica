import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../../src/components/Profile";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import demoImg from "../../src/assets/demoimg.jpeg";
import banner from "../../src/assets/banner.jpeg";
import { MemoryRouter, useLoaderData } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { profileEdit } from "../../src/store/features/profileEditPopup";

const mockUsersData = [
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
  },
];
const mockCurrUser = "krishan.mondal@gmail.com";
const mockPosts = [
  {
    email: "krishan.mondal@gmail.com",
    postId: 1,
    date: "2024-07-21T08:22:54.783Z",
    content:
      "Exploring the beauty of web development! Recently built a dynamic website with React and Node.js. Loving the process and the challenges that come with it.",
    image:
      "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYnNpdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    likes: { count: 7, likedBy: ["john.doe@example.com"] },
    comments: [],
  },
];

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useLoaderData: vi.fn(),
  };
});

describe("Profile", () => {
  let mockDispatch;
  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useLoaderData.mockReturnValue("krishan.mondal@gmail.com");
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) return mockUsersData;
      if (selector.toString().includes("currUser")) return mockCurrUser;
      if (selector.toString().includes("posts")) return mockPosts;
      if (selector.toString().includes("profilePopup")) return true;
      return null;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render all compenents correctly", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    expect(screen.getByTestId("profile-banner")).toBeInTheDocument();
    expect(screen.getByTestId("post")).toBeInTheDocument();
    expect(screen.getByTestId("profile-skill-section")).toBeInTheDocument();
    expect(screen.getByTestId("profile-education-section")).toBeInTheDocument();
    expect(
      screen.getByTestId("profile-experience-section")
    ).toBeInTheDocument();
  });

  it("should open and close popup corretly", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const editProfile = screen.getByTestId("edit-profile");
    await userEvent.click(editProfile);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.openPopup());
    expect(screen.getByText(/edit profile/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("close-edit-profile"));
    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.closePopup());

    const editSkill = screen.getByTestId("edit-skills");
    await userEvent.click(editSkill);

    expect(mockDispatch).toBeCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.openPopup());
    expect(screen.getByText(/add skills/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("close-add-skills"));
    expect(mockDispatch).toBeCalledTimes(4);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.closePopup());

    const editEducation = screen.getByTestId("edit-education");
    await userEvent.click(editEducation);

    expect(mockDispatch).toBeCalledTimes(5);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.openPopup());
    expect(screen.getByText(/add education/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("close-add-education"));
    expect(mockDispatch).toBeCalledTimes(6);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.closePopup());

    const editExperience = screen.getByTestId("edit-experience");
    await userEvent.click(editExperience);

    expect(mockDispatch).toBeCalledTimes(7);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.openPopup());
    expect(screen.getByText(/add experience/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("close-add-experience"));
    expect(mockDispatch).toBeCalledTimes(8);
    expect(mockDispatch).toHaveBeenCalledWith(profileEdit.closePopup());
  });
});
