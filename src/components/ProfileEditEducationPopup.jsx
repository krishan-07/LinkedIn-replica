import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { usersDataAction } from "../store/features/users";

const ProfileEditEducationPopup = ({ user, close }) => {
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
      <div className="modal-cont px-0 pt-1">
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="fw-m fs-m">Add Education</div>
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
export default ProfileEditEducationPopup;
