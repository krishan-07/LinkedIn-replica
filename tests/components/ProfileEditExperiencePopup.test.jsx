import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileEditExperiencePopup from "../../src/components/ProfileEditExperiencePopup";
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

describe("Profile Edit Experience popup", () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });
  it("should render and take input correctly", async () => {
    render(<ProfileEditExperiencePopup user={currUserData} close={close} />);

    expect(screen.getByText(/add experience/i)).toBeInTheDocument();
    expect(
      screen.getByText(currUserData.experience[0].companyName)
    ).toBeInTheDocument();

    const companyName = "xyz company";
    const type = "internship";
    const mode = "remote";
    const start = "20323-09";

    const companyInput = screen.getByLabelText(/Company name/i);
    await userEvent.type(companyInput, companyName);
    expect(companyInput).toHaveValue(companyName);

    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, type);
    expect(titleInput).toHaveValue(type);

    const locationInput = screen.getByLabelText(/Location type/i);
    await userEvent.selectOptions(locationInput, mode);
    expect(locationInput).toHaveValue(mode);

    const startInput = screen.getByLabelText(/start date/i);
    await userEvent.type(startInput, start);
    expect(startInput).toHaveValue(start);

    const button = screen.getByRole("button", { name: /add/i });
    await userEvent.click(button);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.updateExperience({
        id: currUserData.email,
        exp: {
          companyName: companyName,
          type: type,
          mode: mode,
          from: convertMonthYear(start),
          to: "present",
        },
        checkedData: [],
      })
    );
  });
});
