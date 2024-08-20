import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileEditSkillsPopup from "../../src/components/ProfileEditSkillsPopup";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { usersDataAction } from "../../src/store/features/users";

const currUserData = {
  email: "krishan.mondal@gmail.com",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  skills: ["Web Development", "React"],
};

const close = () => {
  return;
};

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("Profile Edit skill popup", () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });
  it("should render and take input correctly", async () => {
    const { rerender } = render(
      <ProfileEditSkillsPopup user={currUserData} close={close} />
    );

    expect(screen.getByText(/add skills/i)).toBeInTheDocument();
    expect(screen.getByText(currUserData.skills[0])).toBeInTheDocument();
    const skill = "tester";

    const companyInput = screen.getByRole("textbox");
    await userEvent.type(companyInput, skill);
    expect(companyInput).toHaveValue(skill);

    const button = screen.getByRole("button", { name: /add/i });
    await userEvent.click(button);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.updateSkills({
        id: currUserData.email,
        skill,
      })
    );

    currUserData.skills = [];
    rerender(<ProfileEditSkillsPopup user={currUserData} close={close} />);
    expect(screen.getByText(/no skills/i)).toBeInTheDocument();
  });
});
