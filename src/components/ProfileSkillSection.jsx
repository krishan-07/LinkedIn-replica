import { FaPlus } from "react-icons/fa6";

const ProfileSkillsSection = ({ user, open, isCurrUser }) => {
  const openPopup = () => {
    open("skills");
  };
  return (
    <div className="profile-card p-3 mb-2">
      <div className="d-flex justify-content-between mb-1">
        <div className="h5">Skills</div>
        {isCurrUser && (
          <div className="me-1 cursor-p" onClick={openPopup}>
            <FaPlus size={15} />
          </div>
        )}
      </div>

      {user.skills.length > 0 ? (
        <div
          className="mb-3"
          style={{ minHeight: "80px", overflow: "auto", maxHeight: "120px" }}
        >
          {user.skills.map((skill) => (
            <div key={skill}>{skill}</div>
          ))}
        </div>
      ) : isCurrUser ? (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          Add skills
        </div>
      ) : (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          No skills
        </div>
      )}
    </div>
  );
};

export default ProfileSkillsSection;
