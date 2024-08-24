import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";
import { IoCloseOutline } from "react-icons/io5";

const ProfileEditUserDataPopup = ({ user, close }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    pronouns: "",
    bio: "",
    location: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const closePopup = () => {
    close("profile");
  };
  const updateProfile = () => {
    dispatch(
      usersDataAction.updateUserData({
        id: user.email,
        data: {
          ...formData,
          pronouns: formData.pronouns === "default" ? "" : formData.pronouns,
        },
      })
    );
    close("profile");
  };
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-cont px-0 pt-1" style={{ maxWidth: "790px" }}>
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Edit Profile</div>
          <div>
            <button
              type="button"
              className="button p-2 pe-0"
              onClick={closePopup}
              data-testid="close-edit-profile"
            >
              <IoCloseOutline size={30} />
            </button>
          </div>
        </div>
        <div className="dropdown-divider mb-2"></div>
        <form className="px-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-s">
              Name
            </label>
            <input
              type="input"
              className="form-control form-control-sm text-secondary"
              id="name"
              placeholder={user.name}
              value={formData.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pronouns" className="form-label fs-s">
              Pronouns
            </label>
            <select
              name="pronouns"
              id="pronouns"
              className="form-select form-select-sm text-secondary"
              value={formData.pronouns}
              onChange={handleOnChange}
            >
              <option value="default">Choose pronouns</option>
              <option value="He/him">He/him</option>
              <option value="She/her">She/her</option>
              <option value="They/them">They/them</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label fs-s">
              Bio
            </label>
            <input
              type="input"
              className="form-control form-control-sm text-secondary"
              id="bio"
              placeholder={user.bio}
              value={formData.bio}
              name="bio"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label fs-s">
              Location
            </label>
            <input
              type="input"
              className="form-control form-control-sm text-secondary"
              id="location"
              placeholder={user.location}
              value={formData.location}
              name="location"
              onChange={handleOnChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={updateProfile}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProfileEditUserDataPopup;
