import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "./../../src/components/LandingPage";
import { vi } from "vitest";
import { useSelector } from "react-redux";
import { useNavigate, MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe("LandingPage", () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render landing page when user is not logged in", () => {
    useSelector.mockReturnValue(null);
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("landing-page-body")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("should navigate to home page when user is logged in", async () => {
    useSelector.mockReturnValue("currUser");

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    expect(navigateMock).toHaveBeenCalledWith("/in");
  });
});
