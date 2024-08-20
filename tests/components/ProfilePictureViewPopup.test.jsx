import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePictureViewPopup from "../../src/components/ProfilePictureViewPopup";
import { MemoryRouter } from "react-router-dom";
import demoImg from "../../src/assets/demoimg.jpeg";

const user = {
  email: "krishan.mondal@gmail.com",
  password: "12345678",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  profileImg: demoImg,
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

describe("Profile picture view popup", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <ProfilePictureViewPopup user={user} close={close} />
      </MemoryRouter>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/src/assets/demoimg.jpeg"
    );
  });
});
