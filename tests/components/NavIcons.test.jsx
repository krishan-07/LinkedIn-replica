import React from "react";
import { render, screen } from "@testing-library/react";
import NavIcon from "../../src/components/NavIcon";
import { MemoryRouter } from "react-router-dom";
describe("NavIcons", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <NavIcon
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
