import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { usersDataAction } from "../store/features/users";
import { convertMonthYear } from "./Utility";

export const EditUserDataPopup = ({ user, close }) => {
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
        data: formData,
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
      <div className="modal-cont px-0" style={{ maxWidth: "790px" }}>
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Edit Profile</div>
          <div>
            <button
              type="button"
              className="btn js-e pe-0 pe-lg-1"
              onClick={closePopup}
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
            <input
              type="input"
              className="form-control form-control-sm text-secondary"
              id="pronouns"
              placeholder={user.pronouns}
              value={formData.pronouns}
              name="pronouns"
              onChange={handleOnChange}
            />
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

export const EditSkillsPopup = ({ user, close }) => {
  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");

  const closePopup = () => {
    close("skills");
  };
  const handleOnChange = (e) => {
    setSkill(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addSkill();
  };
  const addSkill = () => {
    if (skill !== "") {
      dispatch(
        usersDataAction.updateSkills({
          id: user.email,
          skill,
        })
      );
      setSkill("");
    }
  };
  const deleteSkill = (index, e) => {
    dispatch(
      usersDataAction.deleteSkill({
        id: user.email,
        skillIndex: index,
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
      <div className="modal-cont px-0">
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Add skills</div>
          <div className="cursor-p">
            <button
              type="button"
              className="btn js-e pe-0 pe-lg-1"
              onClick={closePopup}
            >
              <IoCloseOutline size={30} />
            </button>
          </div>
        </div>
        <div className="dropdown-divider mb-2"></div>
        <div className="p-1 d-flex flex-wrap ms-3">
          {user.skills.length === 0 ? (
            <div className="text-secondary fst-italic">No skills to show</div>
          ) : (
            user.skills.map((skill, index) => (
              <span className="btn btn-apple w-fc px-3 m-1" key={skill}>
                <span>{skill}</span>
                <span className="ms-2">
                  <IoCloseOutline
                    size={20}
                    onClick={() => {
                      deleteSkill(index);
                    }}
                  />
                </span>
              </span>
            ))
          )}
        </div>
        <div className="mx-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add skills here"
            value={skill}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mx-3 mt-3">
          <button type="button" className="btn btn-success" onClick={addSkill}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditEducationPopup = ({ user, close }) => {
  const dispatch = useDispatch();
  const [education, setEducation] = useState({
    school: "",
    degree: "",
    from: "",
    to: "",
  });

  const closePopup = () => {
    close("education");
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
  };
  const addSkill = () => {
    if (
      education.school !== "" &&
      education.degree !== "" &&
      education.from !== "" &&
      education.to !== ""
    ) {
      dispatch(
        usersDataAction.updateEducation({
          id: user.email,
          education: {
            school: education.school,
            course: education.course,
            from: convertMonthYear(education.from),
            to: convertMonthYear(education.to),
          },
        })
      );
      setEducation({
        school: "",
        degree: "",
        from: "",
        to: "",
      });
    }
  };
  const deleteEducation = (index, e) => {
    dispatch(
      usersDataAction.deleteEducation({
        id: user.email,
        eduIndex: index,
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
      <div className="modal-cont px-0">
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Add Education</div>
          <div className="cursor-p">
            <button
              type="button"
              className="btn js-e pe-0 pe-lg-1"
              onClick={closePopup}
            >
              <IoCloseOutline size={30} />
            </button>
          </div>
        </div>
        <div className="dropdown-divider mb-2"></div>
        <div className="p-1 d-flex flex-wrap">
          {user.education.length === 0 ? (
            <div className="text-secondary fst-italic ms-3">
              No Education to show
            </div>
          ) : (
            user.education.map((obj, index) => (
              <div
                className="btn btn-apple px-3 m-1"
                key={obj.school}
                style={{ borderRadius: "10px" }}
              >
                <div className="d-flex flex-column align-items-start me-2">
                  <div>{obj.school}</div>
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
                      deleteEducation(index);
                    }}
                  />
                </span>
              </div>
            ))
          )}
        </div>
        <div className="mx-3 mt-3">
          <label htmlFor="school" className="form-label">
            School or University:
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={education.school}
            name="school"
            id="school"
            onChange={handleOnChange}
            placeholder="ex: Boston University"
          />
        </div>
        <div className="mx-3 mt-3">
          <label htmlFor="degree" className="form-label">
            Degree or course:
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={education.degree}
            name="degree"
            id="degree"
            onChange={handleOnChange}
            placeholder="ex: Bachelors"
          />
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
            value={education.from}
            onChange={handleOnChange}
          />
        </div>
        <div className="mx-3 mt-3">
          <label htmlFor="to" className="form-label">
            End date or expected:
          </label>
          <input
            type="month"
            className="form-control form-control-sm"
            name="to"
            value={education.to}
            onChange={handleOnChange}
          />
        </div>
        <div className="mx-3 mt-3">
          <button type="button" className="btn btn-success" onClick={addSkill}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditExperiencePopup = ({ user, close }) => {
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
      <div className="modal-cont px-0">
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Add Experience</div>
          <div className="cursor-p">
            <button
              type="button"
              className="btn js-e pe-0 pe-lg-1"
              onClick={closePopup}
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
