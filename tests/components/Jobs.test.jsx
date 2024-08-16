import React from "react";
import { render, screen } from "@testing-library/react";
import Jobs from "../../src/components/Jobs";
import { useSelector } from "react-redux";
import { vi } from "vitest";
import defaultImg from "./../../src/assets/company_logo.jpeg";

const mockJobs = [
  {
    id: 1,
    jobName: "Frontend Developer",
    companyName: "Tech Innovators Inc.",
    type: "Full-time",
    location: "San Francisco, CA",
    logo: defaultImg,
  },
  {
    id: 2,
    jobName: "Backend Developer",
    companyName: "Cloud Solutions Ltd.",
    type: "Part-time",
    location: "New York, NY",
    logo: defaultImg,
  },
];

describe("Jobs", () => {
  beforeEach(() => {
    vi.mock("react-redux", () => ({
      useSelector: vi.fn(),
    }));
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("jobs")) {
        return mockJobs;
      }
      return null;
    });
    render(<Jobs />);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render data correctly", () => {
    const job = screen.getAllByTestId("job");

    expect(job.length).toEqual(2);
    job.forEach((data, index) => {
      expect(data).toHaveTextContent(mockJobs[index].jobName);
      expect(data).toHaveTextContent(mockJobs[index].companyName);
      expect(data).toHaveTextContent(mockJobs[index].location);
    });
  });

  it("should render logo correctly", () => {
    const logo = screen.getAllByTestId("job-logo");

    logo.forEach((img, index) => {
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining(mockJobs[index].logo)
      );
    });
  });
});
