import React from "react";
import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfileImg from "../../src/components/ProfileImg";
import demoImg from "../../src/assets/demoimg.jpeg";
import timeAgo from "../../src/utility/timeaAgo";
import userEvent from "@testing-library/user-event";
import { postsActions } from "../../src/store/features/post";

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
const post = {
  email: "krishan.mondal@gmail.com",
  postId: 1,
  date: "2024-07-21T08:22:54.783Z",
  content:
    "Exploring the beauty of web development! Recently built a dynamic website with React and Node.js. Loving the process and the challenges that come with it.",
  image:
    "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYnNpdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  likes: { count: 7, likedBy: ["john.doe@example.com"] },
  comments: [],
};
const user = usersData.find((user) => user.email === post.email);
const currUser = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  profileImg: demoImg,
  bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
};
const currUserEmail = "krishan.mondal@gmail.com";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("Post", () => {
  let mockDispatch;
  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Post
          post={post}
          user={user}
          usersData={usersData}
          currUser={currUser}
          currUserEmail={currUserEmail}
          profileImg={
            <ProfileImg
              size={"50px"}
              image={user.profileImg}
              name={user.userName}
            />
          }
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId("post")).toBeInTheDocument();
  });

  it("should show post information correctly", () => {
    render(
      <MemoryRouter>
        <Post
          post={post}
          user={user}
          usersData={usersData}
          currUser={currUser}
          currUserEmail={currUserEmail}
          profileImg={
            <ProfileImg
              size={"50px"}
              image={user.profileImg}
              name={user.userName}
            />
          }
        />
      </MemoryRouter>
    );
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
    expect(screen.getByText(user.bio)).toBeInTheDocument();
    expect(screen.getByText(/delete Post/i)).toBeInTheDocument();
    expect(screen.getByText(timeAgo(post.date))).toBeInTheDocument();
    expect(screen.getByAltText("img")).toHaveAttribute("src", post.image);
  });

  it("should update likes when clicked on like button", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <Post
          post={post}
          user={user}
          usersData={usersData}
          currUser={currUser}
          currUserEmail={currUserEmail}
          profileImg={
            <ProfileImg
              size={"50px"}
              image={user.profileImg}
              name={user.userName}
            />
          }
        />
      </MemoryRouter>
    );

    const likeBtn = screen.getByRole("button", { name: /like/i });
    expect(likeBtn).toBeInTheDocument();

    await userEvent.click(likeBtn);
    post.likes.likedBy.push(currUserEmail);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      postsActions.updateLike({
        postId: post.postId,
        userEmail: currUserEmail,
      })
    );

    rerender(
      <MemoryRouter>
        <Post
          post={post}
          user={user}
          usersData={usersData}
          currUser={currUser}
          currUserEmail={currUserEmail}
          profileImg={
            <ProfileImg
              size={"50px"}
              image={user.profileImg}
              name={user.userName}
            />
          }
        />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /liked/i })).toBeInTheDocument();
  });

  it("should update comments when user comments on post", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <Post
          post={post}
          user={user}
          usersData={usersData}
          currUser={currUser}
          currUserEmail={currUserEmail}
          profileImg={
            <ProfileImg
              size={"50px"}
              image={user.profileImg}
              name={user.userName}
            />
          }
        />
      </MemoryRouter>
    );
    const text = "Hi! How are you?";
    const comment = screen.getByPlaceholderText(/add a comment/i);
    const CommentBtn = screen.getByRole("button", { name: /post/i });

    expect(comment).toBeInTheDocument();
    expect(CommentBtn).toBeInTheDocument();

    await userEvent.type(comment, text);

    expect(comment).toHaveValue(text);

    await userEvent.click(CommentBtn);
    post.comments.push({
      id: 1,
      email: "krishan.mondal@gmail.com",
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. At qui temporibus odit, unde fugit sit in. Ad obcaecati quaerat alias.",
      createdAt: "2024-07-05T14:23:35.000Z",
    });

    expect(mockDispatch).toBeCalledTimes(1);

    rerender(
      <MemoryRouter>
        <Post
          post={post}
          user={user}
          usersData={usersData}
          currUser={currUser}
          currUserEmail={currUserEmail}
          profileImg={
            <ProfileImg
              size={"50px"}
              image={user.profileImg}
              name={user.userName}
            />
          }
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("comment")).toBeInTheDocument();
  });
});
