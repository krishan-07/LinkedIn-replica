import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer", () => {
  it("should have the correct classNames", () => {
    render(
      <MemoryRouter>
        <Footer className="custom-class" />
      </MemoryRouter>
    );
    const linkElement = screen.getByText("About").closest("a");

    expect(linkElement).toHaveClass("custom-class");
    expect(linkElement).toHaveClass("nav-link");
  });
});
