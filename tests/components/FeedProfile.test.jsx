import React from "react";
import { render, screen } from "@testing-library/react";
import FeedProfile from "./../../src/components/FeedProfile";
import { MemoryRouter } from "react-router-dom";
import defaultBanner from "./../../src/assets/defaultBanner.svg";
import demoImg from "./../../src/assets/demoimg.jpeg";

const currUser = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  connections: [],
  profileBanner: defaultBanner,
  profileImg: demoImg,
};
const posts = [
  {
    email: "krishan.mondal@gmail.com",
    postId: 1,
  },
];

describe("Feed profile", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <FeedProfile user={currUser} posts={posts} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("feed-profile")).toBeInTheDocument();
    expect(screen.getByText(currUser.name)).toBeInTheDocument();
    expect(screen.getByAltText("banner")).toHaveAttribute(
      "src",
      currUser.profileBanner
    );
    expect(screen.getByAltText(currUser.userName)).toHaveAttribute(
      "src",
      currUser.profileImg
    );
    expect(screen.getByTestId("connections")).toHaveTextContent(
      currUser.connections.length
    );
    expect(screen.getByTestId("posts")).toHaveTextContent(
      posts.filter((post) => post.email === currUser.email).length
    );
  });
});
