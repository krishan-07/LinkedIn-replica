import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPageNavBar from "../../src/components/LandingPageNavBar";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Landing page Navbar", () => {
  it("should navigate user to login page when clicked on Sign In", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LandingPageNavBar />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    const login = screen.getByRole("link", { name: /Sign In/i });
    await userEvent.click(login);

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
  it("should navigate user to signup page when clicked on Join now", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LandingPageNavBar />} />
          <Route path="/signup" element={<div>Sign up page</div>} />
        </Routes>
      </MemoryRouter>
    );
    const signIn = screen.getByRole("link", { name: /Join now/i });
    await userEvent.click(signIn);

    expect(screen.getByText(/sign up page/i)).toBeInTheDocument();
  });
});
