import React from "react";
import Home from "../../src/components/Home";
import { act, render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

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

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) return mockUsersData;
      if (selector.toString().includes("currUser")) return mockCurrUserEmail;
      if (selector.toString().includes("popup")) return false;
      return null;
    });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("should render LoadingPage initially and then show the content after loading", () => {
    const loadingPage = screen.getByTestId("loading-page");

    expect(loadingPage).toBeInTheDocument();
    act(() => {
      vi.runAllTimers();
    });
    expect(loadingPage).not.toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render postInputpopup when it is true", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) return mockUsersData;
      if (selector.toString().includes("currUser")) return mockCurrUserEmail;
      if (selector.toString().includes("popup")) return true;
      return null;
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("postInput-modal")).toBeInTheDocument();
  });
});
