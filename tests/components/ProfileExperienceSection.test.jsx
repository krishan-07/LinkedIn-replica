import React from "react";
import { render, screen, within } from "@testing-library/react";
import ProfileExperienceSection from "../../src/components/ProfileExperienceSection";
import userEvent from "@testing-library/user-event";

const user = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",

  bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
  skills: ["Web Development", "React"],
  experience: [
    {
      companyName: "Cloud Counselage pvt. ltd.",
      type: "Internship",
      mode: "Remote",
      from: "June 2024",
      to: "present",
    },
  ],
};
let isCurrUser = true;
const open = () => {
  return;
};

describe("Profile experience Section", () => {
  it("should render correctly", async () => {
    const { rerender } = render(
      <ProfileExperienceSection
        user={user}
        open={open}
        isCurrUser={isCurrUser}
      />
    );
    expect(screen.getByText(/experience/i)).toBeInTheDocument();
    expect(screen.getByTestId("edit-experience")).toBeInTheDocument();
    user.experience.forEach((exp) => {
      expect(screen.getByText(exp.companyName)).toBeInTheDocument();
      expect(screen.getByText(exp.type)).toBeInTheDocument();
      expect(screen.getByText(exp.mode)).toBeInTheDocument();
      expect(screen.getByText(exp.from)).toBeInTheDocument();
      expect(screen.getByText(exp.to)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("edit-experience"));

    user.experience = [];
    rerender(
      <ProfileExperienceSection
        user={user}
        open={open}
        isCurrUser={isCurrUser}
      />
    );
    expect(screen.getByText(/add experience/i)).toBeInTheDocument();

    isCurrUser = false;
    rerender(
      <ProfileExperienceSection
        user={user}
        open={open}
        isCurrUser={isCurrUser}
      />
    );
    expect(screen.getByText(/no experience/i)).toBeInTheDocument();
  });
});
