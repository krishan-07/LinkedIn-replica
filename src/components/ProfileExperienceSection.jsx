import React from "react";
import { FaPlus } from "react-icons/fa6";

const ProfileExperienceSection = ({ user, open, isCurrUser }) => {
  const openPopup = () => {
    open("experience");
  };
  return (
    <div className="profile-card p-3" data-testid="profile-experience-section">
      <div className="d-flex justify-content-between mb-1">
        <div className="h5">Experience</div>
        {isCurrUser && (
          <div
            className="me-1 cursor-p"
            onClick={openPopup}
            data-testid="edit-experience"
          >
            <FaPlus size={15} />
          </div>
        )}
      </div>

      {user.experience.length > 0 ? (
        <div
          className="mb-3"
          style={{ minHeight: "80px", overflow: "auto", maxHeight: "150px" }}
        >
          {user.experience.map((obj) => (
            <div key={obj.companyName} className="mb-3">
              <p className="m-0 lh-1">{obj.companyName}</p>
              <span className="fst-italic fs-s text-dark">{obj.type}</span>
              <span className="mx-1">-</span>
              <span className="fst-italic fs-s text-dark">{obj.mode}</span>
              <div className="text-secondary fs-s">
                <span>{obj.from}</span>
                <span>-</span>
                <span>{obj.to}</span>
              </div>
            </div>
          ))}
        </div>
      ) : isCurrUser ? (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          Add Experience
        </div>
      ) : (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          No Experience
        </div>
      )}
    </div>
  );
};
export default ProfileExperienceSection;
