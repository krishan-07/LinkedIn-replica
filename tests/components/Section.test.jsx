import React from "react";
import { render, screen } from "@testing-library/react";
import Section from "../../src/components/Section";

describe("Section", () => {
  it("should render props correctly", () => {
    render(
      <Section
        heading="heading"
        body="body"
        tags={["tag1", "tag2"]}
        width={50}
      />
    );
    const button = screen.getAllByRole("button");

    expect(screen.getByText(/heading/i)).toBeInTheDocument();
    expect(screen.getByText(/body/i)).toBeInTheDocument();
    expect(button[0]).toHaveTextContent("tag1");
    expect(button[1]).toHaveTextContent("tag2");
    expect(button.length).toEqual(2);
  });
});
