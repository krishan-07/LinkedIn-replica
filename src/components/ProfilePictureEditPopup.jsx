import { IoCloseOutline } from "react-icons/io5";
import { ProfileImg } from "./Utility";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";

const ProfilePictureEditPopup = ({ user, close }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isImg, setIsImg] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImg(true);
      setImgUrl(URL.createObjectURL(file));
    }
  };
  const Upload = () => {
    dispatch(
      usersDataAction.updateProfilePicture({
        id: user.email,
        imgUrl: imgUrl,
      })
    );
    close("pfp");
  };
  const handleRemove = () => {
    setImgUrl(null);
    setIsImg(false);
    document.getElementById("img-input").value = null;
  };
  const closePopup = () => {
    close("pfp");
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-cont px-0 pt-1 pb-0"
        style={{ maxWidth: "790px", background: "#1b1f23", color: "#fff" }}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-1">
          <div className="fw-m fs-m">Profile Photo</div>
          <div>
            <button
              type="button"
              className="button p-2 pe-0"
              onClick={closePopup}
              style={{ color: "white" }}
            >
              <IoCloseOutline size={30} />
            </button>
          </div>
        </div>
        <div className="dropdown-divider mb-2"></div>
        <div className="d-flex justify-content-center align-items-center py-2">
          {isImg ? (
            <div className="d-flex">
              <ProfileImg image={imgUrl} disable={true} size={"300px"} />
              <div onClick={handleRemove}>
                <IoCloseOutline size={30} />
              </div>
            </div>
          ) : (
            <ProfileImg image={user.profileImg} disable={true} size={"300px"} />
          )}
        </div>
        <div className="d-flex justify-content-between mx-2 align-items-center m-2 p-1">
          <span className="img-input-container position-relative">
            <div className="icon position-absolute">
              <FaImage size={30} />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              id="img-input"
            />
          </span>
          <button
            className="btn btn-post bg-primary"
            onClick={Upload}
            disabled={!isImg}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePictureEditPopup;
