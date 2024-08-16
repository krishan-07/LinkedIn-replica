import React from "react";
import { render, screen } from "@testing-library/react";
import Feed from "../../src/components/Feed";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const mockUsersData = [
  {
    email: "krishan.mondal@gmail.com",
    password: "12345678",
    userName: "johndoe",
    name: "John Doe",
    pronouns: "He/him",
    profileImg: "",
    profileBanner: "",
    bio: "Software Engineer | Tech Enthusiast | Blogger",
    skills: ["JavaScript", "Node.js"],
    location: "Hyderabad, Telangana, India",
    education: [],
    experience: [],
    requests: [],
    connections: [],
    notifications: [],
  },
];
const mockCurrUserEmail = "krishan.mondal@gmail.com";
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

describe("Feed", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render components correctly", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) {
        return mockUsersData;
      }
      if (selector.toString().includes("currUser")) {
        return mockCurrUserEmail;
      }
      if (selector.toString().includes("posts")) {
        return mockPosts;
      }
      return null;
    });
    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    expect(screen.getByTestId("feed-profile")).toBeInTheDocument();
    expect(screen.getByTestId("news")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("post-input")).toBeInTheDocument();
    expect(screen.getByTestId("post")).toBeInTheDocument();
    expect(screen.getAllByTestId("post").length).toEqual(1);
  });
});
