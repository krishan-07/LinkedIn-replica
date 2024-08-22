import React from "react";
import { render, screen } from "@testing-library/react";
import Notifications from "../../src/components/Notifications";
import { useSelector, useDispatch } from "react-redux";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import defaultProfilePicture from "../../src/assets/defaultPfp.jpeg";
import userEvent from "@testing-library/user-event";
import { usersDataAction } from "../../src/store/features/users";

const mockUsersData = [
  {
    email: "krishan.mondal@gmail.com",
    userName: "sreekrishanmondal",
    name: "Sree Krishan Mondal",
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
  {
    email: "john.doe@example.com",
    password: "12345678",
    userName: "johndoe",
    name: "John Doe",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
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

describe("Notifications", () => {
  let mockDispatch = vi.fn();
  let mockNavigate = vi.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) return mockUsersData;
      if (selector.toString().includes("currUser"))
        return "krishan.mondal@gmail.com";
      return null;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render and function", async () => {
    render(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>
    );

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("notification"));

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.markAsRead({
        userEmail: "krishan.mondal@gmail.com",
        id: "john.doe@example.com2024-07-21T08:22:54.783Z",
      })
    );
    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/in/messaging/${mockUsersData[1].userName}`
    );
  });
});
