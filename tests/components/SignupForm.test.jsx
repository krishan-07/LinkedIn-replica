import React from "react";
import { render, screen } from "@testing-library/react";
import SignupForm from "../../src/components/SignupForm";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { usersDataAction } from "../../src/store/features/users";
import { currUserActions } from "../../src/store/features/currUser";

const usersData = [
  {
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
  },
];
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");

  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe("Signup form", () => {
  let mockDispatch;
  let mockNavigate;
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate = vi.fn();
    useSelector.mockReturnValue(usersData);
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });
  it("should render properly", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    expect(screen.getByTestId("signup-form"));
  });
  it("should take input data correctly", async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    screen.debug();
    const email = "xyz@gmail.com";
    const userName = "xyz";
    const password = "abcdefgh";

    const emailInput = screen.getByLabelText(/email/i);
    const userNameInput = screen.getByLabelText(/user name/i);
    const passwordInput = screen.getByLabelText(`Password (6+ characters)`);
    const checkPasswordInput = screen.getByLabelText(/enter password again/i);

    await userEvent.type(emailInput, email);
    await userEvent.type(userNameInput, userName);
    await userEvent.type(passwordInput, password);
    await userEvent.type(checkPasswordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(userNameInput).toHaveValue(userName);
    expect(passwordInput).toHaveValue(password);
    expect(checkPasswordInput).toHaveValue(password);
  });
  it("should signup correctly", async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const email = "xyz@gmail.com";
    const userName = "xyz";
    const password = "abcdefgh";

    const emailInput = screen.getByLabelText(/email/i);
    const userNameInput = screen.getByLabelText(/user name/i);
    const passwordInput = screen.getByLabelText(`Password (6+ characters)`);
    const checkPasswordInput = screen.getByLabelText(/enter password again/i);

    await userEvent.type(emailInput, email);
    await userEvent.type(userNameInput, userName);
    await userEvent.type(passwordInput, password);
    await userEvent.type(checkPasswordInput, password);

    const button = screen.getByRole("button", { name: /Agree & Join/i });

    await userEvent.click(button);

    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.addUserData({
        email: email,
        userName: userName,
        password: password,
        name: userName,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(currUserActions.addUser(email));
  });
});
