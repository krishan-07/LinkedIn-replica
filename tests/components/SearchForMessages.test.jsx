import React from "react";
import { render, screen } from "@testing-library/react";
import SearchForMessages from "../../src/components/SearchForMessages";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import searchData from "../../src/utility/searchData";
import { messagesActions } from "../../src/store/features/messages";

const show = () => {
  return true;
};
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");

  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe("Search for messages ", () => {
  let mockDispatch;
  let mockNavigate;
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate = vi.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render properly", () => {
    render(
      <MemoryRouter>
        <SearchForMessages show={show} currUser={"krishan.mondal@gmail.com"} />
      </MemoryRouter>
    );
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByText(/no people found/i)).toBeInTheDocument();
  });

  it("should render search results and navigate user properly", async () => {
    render(
      <MemoryRouter>
        <SearchForMessages show={show} currUser={"krishan.mondal@gmail.com"} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/type a name/i);

    expect(input).toBeInTheDocument();

    await userEvent.type(input, "j");
    const results = searchData("j");

    results.forEach((result) => {
      expect(screen.getByText(result.name)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId(`search-${results[0].userName}`));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/in/messaging/${results[0].userName}`
    );

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      messagesActions.addMessage({
        currUser: "krishan.mondal@gmail.com",
        userEmail: results[0].email,
        userName: results[0].userName,
      })
    );
  });
});
