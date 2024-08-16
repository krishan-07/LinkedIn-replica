import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Groups from "../../src/components/Groups";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "./../../src/assets/group.jpeg";
import defaultBanner from "./../../src/assets/groupBanner.jpeg";
import { groupsActions } from "../../src/store/features/groups";

const groups = [
  {
    id: 1,
    name: "Machine Learning, Artificial Intelligence, Deep Learning, Computer Vision, Robotics, DataOps, Gen AI",
    image: defaultImage,
    banner: defaultBanner,
    members: 200000,
    joined: false,
  },
  {
    id: 2,
    name: "Web Development, JavaScript, React, Node.js, CSS, HTML",
    image: defaultImage,
    banner: defaultBanner,
    members: 150000,
    joined: false,
  },
];

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe("Groups", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(groups);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render data correctly", () => {
    render(
      <MemoryRouter>
        <Groups />
      </MemoryRouter>
    );
    screen.debug();

    const banner = screen.getAllByTestId("group-banner");
    const image = screen.getAllByTestId("group-image");
    const members = screen.getAllByTestId("group-members");

    expect(screen.getByTestId("groups")).toBeInTheDocument();
    banner.forEach((obj, index) => {
      expect(obj).toHaveAttribute("src", groups[index].banner);
    });
    image.forEach((obj, index) => {
      expect(obj).toHaveAttribute("src", groups[index].image);
    });
    members.forEach((obj, index) => {
      expect(obj).toHaveTextContent(`${groups[index].members} members`);
    });
  });
  it("should change button text after clicking", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <Groups />
      </MemoryRouter>
    );
    const button = screen.getAllByRole("button");

    button.forEach((obj) => {
      expect(obj).toHaveTextContent(/join/i);
    });

    await userEvent.click(button[0]);

    expect(mockDispatch).toHaveBeenCalledWith(groupsActions.joined(1));

    groups[0].joined = true;
    useSelector.mockReturnValue([...groups]);

    rerender(
      <MemoryRouter>
        <Groups />
      </MemoryRouter>
    );
    expect(button[0]).toHaveTextContent(/joined/i);
  });
});
