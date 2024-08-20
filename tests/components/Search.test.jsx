import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../../src/components/Search";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import searchData from "../../src/utility/searchData";
import userEvent from "@testing-library/user-event";

const filteredData = searchData("j");
const setShowSearch = () => {
  return;
};
const setSearchQuery = () => {
  return;
};

vi.mock("react-router-dom", () => {
  const originalModule = vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe("Search", () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });
  it("should render data correctly", () => {
    render(
      <Search
        data={filteredData}
        show={setShowSearch}
        setSearch={setSearchQuery}
      />
    );
    filteredData.forEach((data) => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
    });
  });
  it("should navigate the user to correct destination ", async () => {
    render(
      <Search
        data={filteredData}
        show={setShowSearch}
        setSearch={setSearchQuery}
      />
    );
    const link = screen.getAllByTestId("link");
    await userEvent.click(link[0]);
    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/in/${filteredData[0].userName}`
    );
  });
});
