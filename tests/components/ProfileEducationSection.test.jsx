import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileEducationSection from "../../src/components/ProfileEducationSection";
import userEvent from "@testing-library/user-event";

const user = {
  email: "krishan.mondal@gmail.com",
  userName: "sreekrishanmondal",
  name: "Sree Krishan Mondal",
  pronouns: "He/him",
  education: [
    {
      school: "keshav Memorial Institute of Commerce and Sciences",
      degree: "BCOM [Computer Applications]",
      from: "Apr 2022",
      to: "June 2025",
    },
  ],
};
let isCurrUser = true;
const open = () => {
  console.log("i was called");
};

describe("Profile Education Section", () => {
  it("should render correctly", async () => {
    const { rerender } = render(
      <ProfileEducationSection
        user={user}
        open={open}
        isCurrUser={isCurrUser}
      />
    );
    expect(screen.getByText(/education/i)).toBeInTheDocument();
    expect(screen.getByTestId("edit-education")).toBeInTheDocument();
    user.education.forEach((ed) => {
      expect(screen.getByText(ed.school)).toBeInTheDocument();
      expect(screen.getByText(ed.from)).toBeInTheDocument();
      expect(screen.getByText(ed.to)).toBeInTheDocument();
    });
    await userEvent.click(screen.getByTestId("edit-education"));

    user.education = [];
    rerender(
      <ProfileEducationSection
        user={user}
        open={open}
        isCurrUser={isCurrUser}
      />
    );
    expect(screen.getByText(/add education/i)).toBeInTheDocument();

    isCurrUser = false;
    rerender(
      <ProfileEducationSection
        user={user}
        open={open}
        isCurrUser={isCurrUser}
      />
    );
    expect(screen.getByText(/no education/i)).toBeInTheDocument();
  });
});
