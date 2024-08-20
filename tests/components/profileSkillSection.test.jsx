import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileSkillsSection from "../../src/components/ProfileSkillSection";
import userEvent from "@testing-library/user-event";

const user = {
  email: "krishan.mondal@gmail.com",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  skills: ["Web Development", "React"],
};
let isCurrUser = true;
const open = () => {
  console.log("i was called");
};

describe("Profile skills section", () => {
  it("should render correctly", async () => {
    const { rerender } = render(
      <ProfileSkillsSection user={user} open={open} isCurrUser={isCurrUser} />
    );
    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(screen.getByTestId("edit-skills")).toBeInTheDocument();
    user.skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
    await userEvent.click(screen.getByTestId("edit-skills"));

    user.skills = [];
    rerender(
      <ProfileSkillsSection user={user} open={open} isCurrUser={isCurrUser} />
    );
    expect(screen.getByText(/add skills/i)).toBeInTheDocument();

    isCurrUser = false;
    rerender(
      <ProfileSkillsSection user={user} open={open} isCurrUser={isCurrUser} />
    );
    expect(screen.getByText(/no skills/i)).toBeInTheDocument();
  });
});
