import React from "react";
import { render, screen } from "@testing-library/react";
import Invitations from "../../src/components/Invitations";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const currUser = {
  requests: ["john.doe@example.com", "jane.smith@example.com"],
};

const users = [
  {
    email: "john.doe@example.com",
    userName: "johndoe",
    name: "John Doe",
    bio: "Software Engineer | Tech Enthusiast | Blogger",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    userName: "janesmith",
    bio: "Graphic Designer | Artist | Creative Thinker",
  },
];

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("Invitations", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Invitations currUser={currUser} users={users} />
      </MemoryRouter>
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", () => {
    expect(screen.getByTestId("invitations")).toBeInTheDocument();
  });
  it("should render the user data correctly", () => {
    const invitationData = screen.getAllByTestId("invitation-data");

    expect(invitationData.length).toEqual(2);
    invitationData.forEach((data, index) => {
      expect(data).toHaveTextContent(users[index].name);
      expect(data).toHaveTextContent(users[index].bio);
    });
  });
});
