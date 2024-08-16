import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileImg from "../../src/components/ProfileImg";
import demoImg from "./../../src/assets/defaultPfp.jpeg";
import { MemoryRouter } from "react-router-dom";

describe("ProfileImg", () => {
  it("should render ProfileImg component without Link tag", () => {
    render(
      <ProfileImg
        size={"50px"}
        name={"krishan"}
        image={demoImg}
        disable={true}
      />
    );
    const component = screen.getByRole("img");

    expect(component).toHaveAttribute(
      "alt",
      expect.stringContaining("krishan")
    );
    expect(component).toHaveAttribute(
      "src",
      expect.stringContaining("/src/assets/defaultPfp.jpeg")
    );
    expect(component).toHaveStyle(`
      height: 50px;
      width: 50px;
      borderRadius: 50%
    `);
  });

  it("should render ProfileImg component with Link tag", () => {
    render(
      <MemoryRouter>
        <ProfileImg
          size={"50px"}
          name={"krishan"}
          image={demoImg}
          disable={false}
        />
      </MemoryRouter>
    );

    const component = screen.getByRole("link");

    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute(
      "href",
      expect.stringContaining("/in/krishan")
    );
  });
});
