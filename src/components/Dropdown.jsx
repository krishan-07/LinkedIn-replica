import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CurrUserActions } from "../store/features/currUser";
import ProfileImg from "./ProfileImg";

const Dropdown = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);
  const currUser = useSelector((state) => state.currUser);
  const user = usersData.find((user) => user.email === currUser);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    dropdown ? setDropdown(false) : setDropdown(true);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const directToProfile = () => {
    navigate(`/in/${user.userName}`);
  };
  const handleSignout = () => {
    dispatch(CurrUserActions.addUser(null));
  };

  return (
    <div
      className="dropdown mx-2 mx-sm-3"
      onClick={() => {
        toggleDropdown();
      }}
      ref={dropdownRef}
    >
      <div className="img-container">
        <img src={user.profileImg} alt="" />
      </div>
      <div className="dropdown-toggle d-flex align-items-center">
        <span className="text-secondary fs-sm">Me</span>
      </div>
      {/* dropdown menu */}
      {dropdown && (
        <ul className="dropdown-m p-0">
          <div className="d-flex justify-content-start gap-2 p-2">
            <div
              className="img-container"
              style={{ minWidth: "50px", minHeight: "50px" }}
            >
              <ProfileImg size={"100%"} image={user.profileImg} />
            </div>
            <div className="text-container pe-3 mt-1 ms-1">
              <p className="mb-1 fw-m">{user.name}</p>
              <p className="text-secondary " style={{ fontSize: ".9rem" }}>
                {user.bio}
              </p>
            </div>
          </div>
          <div className="px-2">
            <button
              type="button"
              className="btn-view-profile"
              onClick={directToProfile}
            >
              View profile
            </button>
          </div>
          <hr className="dropdown-divider my-2" />
          <div className="account-banner px-3">
            <p className="mb-1" style={{ fontWeight: "500" }}>
              Account
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: ".9rem" }}>
              Setting and Privacy
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: ".9rem" }}>
              Help
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: ".9rem" }}>
              Language
            </p>
          </div>
          <hr className="dropdown-divider my-2" />
          <div className="account-banner px-3">
            <p className="mb-1" style={{ fontWeight: "500" }}>
              Manage
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: ".9rem" }}>
              Post and Activity
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: ".9rem" }}>
              Job Posting Accout
            </p>
          </div>
          <hr className="dropdown-divider my-2" />
          <div className="account-banner px-3 mb-2">
            <Link
              to="/"
              className="link link-secondary"
              style={{ fontSize: ".9rem" }}
              onClick={handleSignout}
            >
              Sign out
            </Link>
          </div>
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
