import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPageBody from "../../src/components/LandingPageBody";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("LandingPage Body", () => {
  it("should direct user to login page when clicked on signin link", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LandingPageBody />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Sign In/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("/login"));

    await userEvent.click(link);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
