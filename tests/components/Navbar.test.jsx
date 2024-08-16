import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./../../src/components/Navbar";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import defaultProfilePicture from "./../../src/assets/defaultPfp.jpeg";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockUserData = [
  {
    email: "krishan.mondal@gmail.com",
    password: "12345678",
    userName: "sreekrishanmondal",
    name: "Sree Krishan Mondal",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
    bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
    notifications: [
      {
        id: "john.doe@example.com2024-07-21T08:22:54.783Z",
        email: "john.doe@example.com",
        type: "message",
        read: false,
        createdAt: "2024-07-21T08:22:54.783Z",
      },
    ],
  },
];

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) return mockUserData;
      if (selector.toString().includes("currUser"))
        return "krishan.mondal@gmail.com";
      return null;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render nav icons correcty", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/My network/i)).toBeInTheDocument();
    expect(screen.getByText(/jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Messaging/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });
  it("should render dropdown correctly", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();

    await userEvent.click(dropdown);

    expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
  });
});
