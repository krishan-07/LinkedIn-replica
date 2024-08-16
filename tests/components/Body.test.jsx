import React from "react";
import { render, screen } from "@testing-library/react";
import Body from "../../src/components/Body";

describe("Body", () => {
  it("should render correctly with children", () => {
    render(
      <Body>
        <p>Test Child</p>
      </Body>
    );
    const children = screen.getByRole("paragraph");

    expect(children).toBeInTheDocument();
    expect(children).toHaveTextContent(/Test child/i);
  });
});
