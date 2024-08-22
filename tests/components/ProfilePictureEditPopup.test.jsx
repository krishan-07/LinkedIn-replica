import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePictureEditPopup from "../../src/components/ProfilePictureEditPopup";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import demoImg from "../../src/assets/demoimg.jpeg";
import banner from "../../src/assets/banner.jpeg";
import userEvent from "@testing-library/user-event";
import { usersDataAction } from "../../src/store/features/users";

const currUserData = {
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
const close = () => {
  return;
};

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("Profile picture edit popup", () => {
  let mockCreateObjectURL = vi.fn();
  let mockDispatch = vi.fn();
  beforeEach(() => {
    mockCreateObjectURL.mockReturnValue("mock-url");

    global.URL.createObjectURL = mockCreateObjectURL;

    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", async () => {
    render(
      <MemoryRouter>
        <ProfilePictureEditPopup user={currUserData} close={close} />
      </MemoryRouter>
    );

    expect(screen.getByText(/profile photo/i));
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/src/assets/demoimg.jpeg"
    );

    const imageInput = screen.getByTestId("img-input");

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    await userEvent.upload(imageInput, file);

    expect(imageInput.files[0]).toEqual(file);
    expect(imageInput.files).toHaveLength(1);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "mock-url");

    const button = screen.getByRole("button", { name: /upload/i });
    await userEvent.click(button);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      usersDataAction.updateProfilePicture({
        id: currUserData.email,
        imgUrl: "mock-url",
      })
    );
  });
});
