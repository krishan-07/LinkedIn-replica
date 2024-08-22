import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FindPeople from "../../src/components/FindPeople";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import defaultProfilePicture from "./../../src/assets/defaultPfp.jpeg";
import defaultbanner from "./../../src/assets/defaultBanner.svg";
import userEvent from "@testing-library/user-event";

const mockCurrUser = {
  email: "krishan.mondal@gmail.com",
  requests: ["john.doe@example.com"],
  connections: ["jane.smith@example.com"],
};
const mockUsers = [
  {
    email: "michael.brown@example.com",
    name: "Michael Brown",
    userName: "michaelbrown",
    profileImg: defaultProfilePicture,
    profileBanner: defaultbanner,
    bio: "Entrepreneur | Innovator | Mentor",
    requests: [],
  },
];
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("FindPeople", () => {
  let mockDispatch;
  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    vi.clearAllMocks;
  });
  it("should render users correctly", () => {
    render(
      <MemoryRouter>
        <FindPeople currUser={mockCurrUser} users={mockUsers} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].name)).toHaveAttribute(
      "href",
      `/in/${mockUsers[0].userName}`
    );
    expect(screen.getByText(/Entrepreneur/i)).toBeInTheDocument();
  });
  it("should change the text of button when clicked on connect", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <FindPeople currUser={mockCurrUser} users={mockUsers} />
      </MemoryRouter>
    );
    const connectButton = screen.getByRole("button", { name: /connect/i });

    expect(connectButton).toBeInTheDocument();

    await userEvent.click(connectButton);
    mockUsers[0].requests = mockCurrUser.email;

    expect(mockDispatch).toBeCalledTimes(2);

    rerender(
      <MemoryRouter>
        <FindPeople currUser={mockCurrUser} users={mockUsers} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /requested/i })
    ).toBeInTheDocument();
  });
});
