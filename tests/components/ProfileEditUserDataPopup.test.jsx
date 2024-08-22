import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileEditUserDataPopup from "../../src/components/ProfileEditUserDataPopup";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { usersDataAction } from "../../src/store/features/users";

const currUserData = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  bio: "Student | KMES | frontend developer | Contributor @ GSSoC'24 | intern @ Cloud Clounselage pvt. ltd.",
  skills: ["Web Development", "React"],
  location: "Hyderabad, Telangana, India",
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
    render(<ProfileEditUserDataPopup user={currUserData} close={close} />);

    expect(screen.getByText(/edit profile/i)).toBeInTheDocument();

    const name = "xyz";
    const pronouns = "He/him";
    const bio = "lorem";
    const location = "india";

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, name);
    expect(nameInput).toHaveValue(name);

    const pronounsInput = screen.getByLabelText(/pronouns/i);
    await userEvent.selectOptions(pronounsInput, pronouns);
    expect(pronounsInput).toHaveValue(pronouns);

    const bioInput = screen.getByLabelText(/bio/i);
    await userEvent.type(bioInput, bio);
    expect(bioInput).toHaveValue(bio);

    const locationInput = screen.getByLabelText(/Location/i);
    await userEvent.type(locationInput, location);
    expect(locationInput).toHaveValue(location);

    const button = screen.getByRole("button", { name: /save/i });
    await userEvent.click(button);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.updateUserData({
        id: currUserData.email,
        data: {
          name,
          bio,
          location,
          pronouns: pronouns === "default" ? "" : pronouns,
        },
      })
    );
  });
});
