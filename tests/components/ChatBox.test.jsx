import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router-dom";
import ChatBox from "../../src/components/ChatBox";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";

const usersData = [
  {
    email: "krishan.mondal@gmail.com",
    userName: "sreekrishanmondal",
    name: "Sree Krishan Mondal",
    bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
  },
  {
    email: "john.doe@example.com",
    userName: "johndoe",
    name: "John Doe",
    bio: "Software Engineer | Tech Enthusiast | Blogger",
  },
];
const messages = [
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

describe("ChatBox", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useLoaderData.mockReturnValue("johndoe");
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) {
        return usersData;
      }
      if (selector.toString().includes("currUser")) {
        return "krishan.mondal@gmail.com";
      }
      if (selector.toString().includes("messages")) {
        return messages;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render data and messages correctly", () => {
    render(
      <MemoryRouter>
        <ChatBox />
      </MemoryRouter>
    );
    const chat = screen.getAllByTestId("chat");

    expect(screen.getByTestId("messages")).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(chat.length).toEqual(2);
    chat.forEach((chat, index) => {
      expect(chat).toHaveTextContent(
        messages[0].inbox[0].messages[index].message
      );
    });
  });
  it("should get user input correctly and dispatch properly", async () => {
    render(
      <MemoryRouter>
        <ChatBox />
      </MemoryRouter>
    );

    const textArea = screen.getByRole("textbox");
    const button = screen.getByTestId("send-button");
    const mockMessage = "what are you doing?";

    await userEvent.type(textArea, mockMessage);
    expect(textArea).toHaveValue(mockMessage);

    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
