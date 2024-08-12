import { FaPlus } from "react-icons/fa6";

const ProfileEducationSection = ({ user, open, isCurrUser }) => {
  const openPopup = () => {
    open("education");
  };
  return (
    <div className="profile-card p-3 mb-2">
      <div className="d-flex justify-content-between mb-1">
        <div className="h5">Education</div>
        {isCurrUser && (
          <div className="me-1 cursor-p" onClick={openPopup}>
            <FaPlus size={15} />
          </div>
        )}
      </div>

      {user.education.length > 0 ? (
        <div
          className="mb-3"
          style={{ minHeight: "80px", overflow: "auto", maxHeight: "150px" }}
        >
          {user.education.map((obj) => (
            <div key={obj.school} className="mb-3">
              <div>{obj.school}</div>
              <div className="text-secondary fs-s">
                {obj.from} - {obj.to}
              </div>
            </div>
          ))}
        </div>
      ) : isCurrUser ? (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          Add Education
        </div>
      ) : (
        <div
          className="w-100 text-secondary d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "80px" }}
        >
          No Education
        </div>
      )}
    </div>
  );
};
export default ProfileEducationSection;
