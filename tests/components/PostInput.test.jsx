import React from "react";
import { render, screen } from "@testing-library/react";
import PostInput from "../../src/components/PostInput";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import demoImg from "../../src/assets/demoimg.jpeg";
import userEvent from "@testing-library/user-event";
import { createPostActions } from "../../src/store/features/createPostModal";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("Post Input ", () => {
  let mockDisaptch;
  beforeEach(() => {
    mockDisaptch = vi.fn();
    useDispatch.mockReturnValue(mockDisaptch);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should work properly", async () => {
    render(
      <MemoryRouter>
        <PostInput
          user={{
            userName: "sreekrishanmondal",
            profileImg: demoImg,
          }}
        />
      </MemoryRouter>
    );
    const button = screen.getByText(/start a post/i);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(mockDisaptch).toBeCalledTimes(1);
    expect(mockDisaptch).toHaveBeenCalledWith(createPostActions.openPopup());
  });
});
