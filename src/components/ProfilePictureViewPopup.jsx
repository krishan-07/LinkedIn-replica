import { IoCloseOutline } from "react-icons/io5";
import { ProfileImg } from "./Utility";

const ProfilePictureViewPopup = ({ user, close }) => {
  const closePopup = () => {
    close("viewPfp");
  };
  return (
    <div className="modal-overlay">
      <div
        className="modal-cont px-0 pt-1 pb-0"
        style={{ minWidth: "500px", background: "#000", color: "#fff" }}
      >
        <div className="d-flex cursor-p">
          <div onClick={closePopup} className="ms-auto p-1">
            <IoCloseOutline size={30} />
          </div>
        </div>
        <div className="d-flex justify-content-center p-3 mb-4">
          <ProfileImg image={user.profileImg} disable={true} size={"350px"} />
        </div>
      </div>
    </div>
  );
};
export default ProfilePictureViewPopup;
