import React from "react";
import { render, screen } from "@testing-library/react";
import NavIcons from "../../src/components/NavIcons";
import { MemoryRouter } from "react-router-dom";

describe("NavIcons", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <NavIcons
          icon="icon"
          name="Home"
          href="/in"
          className="demo-className"
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/icon/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/in");
    expect(screen.getByRole("listitem")).toHaveClass("demo-className");
  });
});
