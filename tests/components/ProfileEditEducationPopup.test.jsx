import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileEditEducationPopup from "../../src/components/ProfileEditEducationPopup";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { usersDataAction } from "../../src/store/features/users";
import convertMonthYear from "../../src/utility/convertMonthYear";

const currUserData = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
  skills: ["Web Development", "React"],
  location: "Hyderabad, Telangana, India",
  education: [
    {
      school: "keshav Memorial Institute of Commerce and Sciences",
      degree: "BCOM [Computer Applications]",
      from: "Apr 2022",
      to: "June 2025",
    },
  ],
  experience: [
    {
      companyName: "Cloud Counselage pvt. ltd.",
      type: "Internship",
      mode: "Remote",
      from: "June 2024",
      to: "present",
    },
  ],
  requests: ["john.doe@example.com"],
  connections: ["jane.smith@example.com"],
};

const close = () => {
  return;
};

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("ProfileEditEducationPopup ", () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render and get input correctly", async () => {
    render(<ProfileEditEducationPopup user={currUserData} close={close} />);

    expect(screen.getByText(/add education/i)).toBeInTheDocument();
    expect(
      screen.getByText(currUserData.education[0].school)
    ).toBeInTheDocument();
    const school = "xyz school";
    const degree = "CSE";
    const start = "2023-08";
    const end = "20323-09";

    const schoolInput = screen.getByLabelText(/school/i);
    await userEvent.type(schoolInput, school);
    expect(schoolInput).toHaveValue(school);

    const degreeInput = screen.getByLabelText(/degree or course/i);
    await userEvent.type(degreeInput, degree);
    expect(degreeInput).toHaveValue(degree);

    const startInput = screen.getByLabelText(/start date/i);
    await userEvent.type(startInput, start);
    expect(startInput).toHaveValue(start);

    const endInput = screen.getByLabelText(/end date/i);
    await userEvent.type(endInput, end);
    expect(endInput).toHaveValue(end);

    const button = screen.getByRole("button", { name: /add/i });
    await userEvent.click(button);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.updateEducation({
        id: currUserData.email,
        education: {
          school: school,
          course: degree,
          from: convertMonthYear(start),
          to: convertMonthYear(end),
        },
      })
    );
  });
});
