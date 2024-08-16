import React from "react";
import Column from "../../src/components/Column";
import { render, screen } from "@testing-library/react";

describe("Column", () => {
  it("should render correctly with className and children", () => {
    const testClassName = "test-class";
    const testContent = "Test Content";
    render(<Column className={testClassName}>{testContent}</Column>);

    const divElement = screen.getByText(testContent);

    expect(divElement).toHaveClass(testClassName);
    expect(divElement).toHaveTextContent(testContent);
  });

  it("should render the correct children component", () => {
    render(
      <Column>
        <p>Test child</p>
      </Column>
    );

    const children = screen.getByRole("paragraph");

    expect(children).toBeInTheDocument();
  });
});
