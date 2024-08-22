import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePosts from "../../src/components/ProfilePosts";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import demoImg from "../../src/assets/demoimg.jpeg";
import userEvent from "@testing-library/user-event";
import { createPostActions } from "../../src/store/features/createPostModal";

const usersData = [
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
const posts = [
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
const user = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  profileImg: demoImg,
  bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
};
const currUserData = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  profileImg: demoImg,
  bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
};
const currUserEmail = "krishan.mondal@gmail.com";
const isCurrUser = true;

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("Profile posts", () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", async () => {
    render(
      <MemoryRouter>
        <ProfilePosts
          usersData={usersData}
          user={user}
          posts={posts}
          isCurrUser={isCurrUser}
          currUserEmail={currUserEmail}
          currUserData={currUserData}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/my activity/i)).toBeInTheDocument();

    posts.forEach((post) => {
      if (post.email === user.email) {
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.bio)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();
      }
    });

    const button = screen.getByRole("button", { name: /add post/i });
    await userEvent.click(button);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(createPostActions.openPopup());
  });
});
