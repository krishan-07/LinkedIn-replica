import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";
import { IoCloseOutline } from "react-icons/io5";

const ProfileEditSkillsPopup = ({ user, close }) => {
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
      <div className="modal-cont px-0 pt-1">
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Add skills</div>
          <div className="cursor-p">
            <button
              type="button"
              className="button p-2 pe-0"
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

export default ProfileEditSkillsPopup;
