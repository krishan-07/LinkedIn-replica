import React from "react";
import { render, screen } from "@testing-library/react";
import PostInputPopup from "../../src/components/PostInputPopup";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import demoImg from "../../src/assets/demoimg.jpeg";
import userEvent from "@testing-library/user-event";

const mockUsersData = [
  {
    email: "krishan.mondal@gmail.com",
    password: "12345678",
    userName: "sreekrishanmondal",
    name: "Sree Krishan Mondal",
    pronouns: "He/him",
    profileImg: demoImg,
    bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
    skills: ["Web Development", "React"],
    location: "Hyderabad, Telangana, India",
  },
];
const mockCurrUser = "krishan.mondal@gmail.com";
const mockPosts = [{ postId: 1 }];
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe("PostInputPopup", () => {
  let mockCreateObjectURL = vi.fn();
  let mockDispatch;
  beforeEach(() => {
    mockCreateObjectURL = vi.fn();
    mockDispatch = vi.fn();

    global.URL.createObjectURL = mockCreateObjectURL;

    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("usersData")) return mockUsersData;
      if (selector.toString().includes("currUser")) return mockCurrUser;
      if (selector.toString().includes("posts")) return mockPosts;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", async () => {
    render(
      <MemoryRouter>
        <PostInputPopup />
      </MemoryRouter>
    );
    const text = "This is dummy text";

    expect(screen.getByTestId("postInput-modal")).toBeInTheDocument();
    expect(screen.getByText(mockUsersData[0].name)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), text);

    expect(screen.getByRole("textbox")).toHaveValue(text);
  });

  it("should accept image upload correctly", async () => {
    mockCreateObjectURL.mockReturnValue("mock-url");

    render(
      <MemoryRouter>
        <PostInputPopup />
      </MemoryRouter>
    );

    const imageInput = screen.getByTestId("img-input");

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    await userEvent.upload(imageInput, file);

    expect(imageInput.files[0]).toEqual(file);
    expect(imageInput.files).toHaveLength(1);

    expect(screen.getByTestId("img-preview")).toBeInTheDocument();
    expect(screen.getByTestId("img-preview")).toHaveAttribute(
      "src",
      "mock-url"
    );
  });

  it("should handle user post properly when user clicks on add post", async () => {
    render(
      <MemoryRouter>
        <PostInputPopup />
      </MemoryRouter>
    );
    const text = "This is dummy text";
    const button = screen.getByRole("button", { name: /post/i });
    const textArea = screen.getByRole("textbox");

    expect(button).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();

    await userEvent.type(textArea, text);
    await userEvent.click(button);

    expect(mockDispatch).toBeCalledTimes(2);
  });
});
