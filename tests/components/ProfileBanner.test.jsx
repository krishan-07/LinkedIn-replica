import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileBanner from "../../src/components/ProfileBanner";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import demoImg from "../../src/assets/demoimg.jpeg";
import banner from "../../src/assets/banner.jpeg";

const user = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  profileImg: demoImg,
  profileBanner: banner,
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
const currUserData = {
  requests: ["john.doe@example.com"],
  connections: ["jane.smith@example.com"],
};
const isCurrUser = true;
const open = () => {
  return;
};

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("ProfileBanner", () => {
  beforeEach(() => {});
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <ProfileBanner
          user={user}
          open={open}
          isCurrUser={isCurrUser}
          currUserData={currUserData}
        />
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByAltText("banner")).toBeInTheDocument();
    expect(screen.getByAltText("banner")).toHaveAttribute(
      "src",
      "/src/assets/banner.jpeg"
    );
    expect(screen.getByAltText(user.userName)).toBeInTheDocument;
    expect(screen.getByAltText(user.userName)).toHaveAttribute(
      "src",
      "/src/assets/demoimg.jpeg"
    );
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.bio)).toBeInTheDocument();
    expect(screen.getByText(/connections/i)).toHaveTextContent(1);
  });
});
