import React from "react";
import { render, screen } from "@testing-library/react";
import Messages from "../../src/components/Messages";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import defaultProfilePicture from "./../../src/assets/defaultPfp.jpeg";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockUsersData = [
  {
    email: "john.doe@example.com",
    userName: "johndoe",
    name: "John Doe",
    pronouns: "He/him",
    profileImg: defaultProfilePicture,
    bio: "Software Engineer | Tech Enthusiast | Blogger",
  },
];
const mockMessages = [
  {
    email: "krishan.mondal@gmail.com",
    inbox: [
      {
        email: "john.doe@example.com",
        userName: "johndoe",
        messages: [
          {
            email: "krishan.mondal@gmail.com",
            message: "hiiiiiiiiii",
          },
          {
            email: "john.doe@example.com",
            message: "hi, how are you",
          },
        ],
      },
    ],
  },
];

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe("messages", () => {
  let mockNavigate;
  beforeEach(() => {
    mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) {
        return mockUsersData;
      }
      if (selector.toString().includes("currUser")) {
        return "krishan.mondal@gmail.com";
      }
      if (selector.toString().includes("messages")) {
        return mockMessages;
      }
      return null;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render user card correctly when inbox is not empty", () => {
    render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    const users = screen.getAllByTestId("mssg-user-card");

    users.forEach((user) => {
      expect(user).toBeInTheDocument();
    });
  });
  it("should render search button when inbox is empty", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) {
        return mockUsersData;
      }
      if (selector.toString().includes("currUser")) {
        return "abc@example.com";
      }
      if (selector.toString().includes("messages")) {
        return mockMessages;
      }
      return null;
    });
    render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("mssg-user-card")).not.toBeInTheDocument();
    expect(screen.getByText(/find people/i)).toBeInTheDocument();
  });
  it("should show search bar when click on add button", async () => {
    render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    const addButton = screen.queryByTestId("add-button");

    expect(addButton).toBeInTheDocument();

    await userEvent.click(addButton);

    expect(screen.getByTestId("search-for-messages")).toBeInTheDocument();
    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/in/messaging");
  });
  it("should navigate to correct path when clicked on user card", async () => {
    render(
      <MemoryRouter initialEntries={["/in/messaging"]}>
        <Messages />
      </MemoryRouter>
    );
    await userEvent.click(screen.queryByTestId("mssg-user-card"));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(mockUsersData[0].userName);
  });
});
