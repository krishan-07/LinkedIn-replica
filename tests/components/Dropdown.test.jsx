import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Dropdown from "../../src/components/Dropdown";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import demoImg from "./../../src/assets/demoimg.jpeg";
import userEvent from "@testing-library/user-event";
import { currUserActions } from "../../src/store/features/currUser";

const mockUsersData = [
  {
    email: "krishan.mondal@gmail.com",
    password: "12345678",
    userName: "sreekrishanmondal",
    name: "Sree Krishan Mondal",
    pronouns: "He/him",
    profileImg: demoImg,
    bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
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
    useNavigate: vi.fn(),
  };
});
describe("Dropdown", () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) {
        return mockUsersData;
      }
      if (selector.toString().includes("currUser")) {
        return "krishan.mondal@gmail.com";
      }
      return null;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );

    expect(screen.getByTestId("dropdown-img")).toHaveAttribute(
      "src",
      mockUsersData[0].profileImg
    );
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  });
  it("should render dropdown content when clicked", async () => {
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByTestId("dropdown"));

    expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
  });
  it("should direct to user profile when clicked on view Profile button", async () => {
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByTestId("dropdown"));
    await userEvent.click(screen.getByText(/view profile/i));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/in/${mockUsersData[0].userName}`
    );
  });
  it("should signout properly", async () => {
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByTestId("dropdown"));
    await userEvent.click(screen.getByText(/sign out/i));

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(currUserActions.addUser(null));
  });
});
