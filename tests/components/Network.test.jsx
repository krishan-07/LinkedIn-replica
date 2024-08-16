import React from "react";
import { render, screen } from "@testing-library/react";
import Network from "../../src/components/Network";
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
const mockGroups = [
  {
    id: 1,
    name: "Machine Learning, Artificial Intelligence, Deep Learning, Computer Vision, Robotics, DataOps, Gen AI",
    image: "defaultImage",
    banner: "defaultBanner",
    members: 200000,
    joined: false,
  },
];

describe("Network ", () => {
  beforeEach(() => {
    vi.mock("react-redux", () => ({
      useSelector: vi.fn(),
      useDispatch: vi.fn(),
    }));
  });
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
      if (selector.toString().includes("groups")) {
        return mockGroups;
      }
      return null;
    });

    render(
      <MemoryRouter>
        <Network />
      </MemoryRouter>
    );

    expect(screen.getByTestId("network")).toBeInTheDocument();
    expect(screen.getByTestId("findPeople")).toBeInTheDocument();
    expect(screen.getByTestId("invitations")).toBeInTheDocument();
    expect(screen.getByTestId("groups")).toBeInTheDocument();
  });
});
