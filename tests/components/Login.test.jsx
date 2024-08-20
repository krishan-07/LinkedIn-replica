import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../../src/components/Login";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
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

describe("Login", () => {
  let mockDispatch;
  let mockNavigate;
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate = vi.fn();
    useSelector.mockReturnValue(usersData);
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
  it("should take input data from user and login correctly", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const email = "krishan.mondal@gmail.com";
    const password = "12345678";

    const emailInput = screen.getByPlaceholderText(/name@example/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);

    const button = screen.getByTestId("button");

    await userEvent.click(button);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(currUserActions.addUser(email));
  });
});
