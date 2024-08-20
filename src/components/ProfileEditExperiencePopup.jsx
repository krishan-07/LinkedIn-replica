import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";
import { IoCloseOutline } from "react-icons/io5";
import React from "react";
import convertMonthYear from "../utility/convertMonthYear";

const ProfileEditExperiencePopup = ({ user, close }) => {
  const dispatch = useDispatch();
  const [experience, setExperience] = useState({
    companyName: "",
    type: "",
    mode: "",
    from: "",
  });
  const [checkboxes, setCheckboxes] = useState({});
  const checkedData = [];

  const closePopup = () => {
    close("experience");
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };
  const handleCheckbox = (e) => {
    const { id, checked } = e.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  const checkedItems = () => {
    Object.entries(checkboxes).forEach(([key, value]) => {
      if (value) checkedData.push(key);
    });
  };
  const addExperience = () => {
    if (
      experience.companyName !== "" &&
      experience.type !== "" &&
      experience.mode !== "default" &&
      experience.from !== ""
    ) {
      checkedItems();
      dispatch(
        usersDataAction.updateExperience({
          id: user.email,
          exp: {
            companyName: experience.companyName,
            type: experience.type,
            mode: experience.mode,
            from: convertMonthYear(experience.from),
            to: "present",
          },
          checkedData,
        })
      );
      setExperience({
        companyName: "",
        type: "",
        mode: "",
        from: "",
      });
      close("experience");
    }
  };
  const deleteExperience = (index) => {
    dispatch(
      usersDataAction.deleteExperience({
        id: user.email,
        expIndex: index,
      })
    );
  };
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-cont px-0 pt-1">
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Add Experience</div>
          <div className="cursor-p">
            <button
              type="button"
              className="button p-2 pe-0"
              onClick={closePopup}
              data-testid="close-add-experience"
            >
              <IoCloseOutline size={30} />
            </button>
          </div>
        </div>
        <div style={{ overflowY: "auto", height: "60dvh" }}>
          <div className="dropdown-divider mb-2"></div>
          <div className="p-1 d-flex flex-wrap col-12 col-sm-7">
            {user.experience.length === 0 ? (
              <div className="text-secondary fst-italic ms-3">
                No Experience to show
              </div>
            ) : (
              user.experience.map((obj, index) => (
                <div
                  className="btn btn-apple px-3 m-1"
                  key={obj.companyName}
                  style={{ borderRadius: "10px" }}
                >
                  <div className="d-flex flex-column align-items-start me-2">
                    <div>{obj.companyName}</div>
                    <div className="text-secondary fs-s">
                      {obj.type} - <span>{obj.mode}</span>
                    </div>
                    <div>
                      <span className="text-secondary fs-s">{obj.from}</span>
                      <span className="mx-1">-</span>
                      <span className="text-secondary fs-s">{obj.to}</span>
                    </div>
                  </div>
                  <span className="ms-2">
                    <IoCloseOutline
                      size={20}
                      onClick={() => {
                        deleteExperience(index);
                      }}
                    />
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="mx-3 mt-3">
            <label htmlFor="companyName" className="form-label">
              Company name*
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={experience.companyName}
              name="companyName"
              id="companyName"
              onChange={handleOnChange}
              placeholder="ex: Google"
            />
          </div>
          <div className="mx-3 mt-3">
            <label htmlFor="type" className="form-label">
              Title*
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={experience.type}
              name="type"
              id="type"
              onChange={handleOnChange}
              placeholder="ex: Software Engineer"
            />
          </div>
          <div className="mx-3 mt-3">
            <label htmlFor="mode" className="form-label">
              Location type*
            </label>
            <select
              name="mode"
              id="mode"
              className="form-select"
              value={experience.mode}
              onChange={handleOnChange}
            >
              <option value="default">Please select</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On site</option>
            </select>
            <div id="emailHelp" className="form-text fs-s ms-1">
              Please select location type (ex: Remote)
            </div>
          </div>

          <div className="mx-3 mt-3">
            <label htmlFor="from" className="form-label">
              Start date:
            </label>
            <input
              type="month"
              className="form-control form-control-sm"
              name="from"
              id="from"
              value={experience.from}
              onChange={handleOnChange}
            />
          </div>
          {user.experience.map(
            (obj) =>
              obj.to === "present" && (
                <div
                  className="form-check mx-3 mt-3 text-secondary mb-2"
                  key={obj.companyName}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={obj.companyName}
                    onChange={handleCheckbox}
                  />
                  <label className="form-check-label" htmlFor={obj.companyName}>
                    End current position as of now - {obj.companyName}
                  </label>
                </div>
              )
          )}
        </div>
        <div className="mx-3 mt-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={addExperience}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileEditExperiencePopup;
