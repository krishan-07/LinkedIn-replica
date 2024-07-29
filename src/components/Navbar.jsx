import logo from "../assets/appLogo.png";
import NavIcons from "./NavIcons";
import { IoMdHome } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { PiBagFill } from "react-icons/pi";
import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa6";
import { CgMenuGridR } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CurrUserActions } from "../store/features/currUser";
import { ProfileImg } from "./Utility";

const Dropdown = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);
  const currUser = useSelector((state) => state.currUser);
  const user = usersData.find((user) => user.email === currUser);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-m");

    dropdown.classList.toggle("active");
    dropdownMenu.classList.toggle("d-none");
  };
  const directToProfile = () => {
    navigate(`/in/${user.userName}`);
  };
  const handleSignout = () => {
    dispatch(CurrUserActions.addUser(null));
    navigate("/", { replace: true });
  };

  return (
    <div
      className="dropdown mx-2 mx-sm-3"
      onClick={() => {
        toggleDropdown();
      }}
    >
      <div className="img-container">
        <img src={user.profileImg} alt="" />
      </div>
      <div className="dropdown-toggle d-flex align-items-center">
        <span className="text-secondary fs-sm">Me</span>
      </div>
      {/* dropdown menu */}
      <ul className="dropdown-m p-0 d-none">
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
    </div>
  );
};

const Navbar = () => {
  const usersData = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const user = usersData.find((data) => data.email === currUserEmail);
  const navItems = [
    { icon: <IoMdHome size={25} />, name: "Home", href: "/in" },
    { icon: <MdPeopleAlt size={25} />, name: "My Network", href: "mynetwork" },
    { icon: <PiBagFill size={25} />, name: "Jobs", href: "jobs" },
    {
      icon: <AiFillMessage size={25} />,
      name: "Messaging",
      href: "messaging",
    },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg p-0 position-sticky top-0 mt-1 mt-sm-0 z-1"
      style={{ background: "white" }}
    >
      <div className="container-fluid d-flex flex-nowrap justify-content-evenly justify-content-xl-start justify-content-sm-center">
        <div className="ms-lg-5">
          <Link className="navbar-brand " to="/in">
            <img
              src={logo}
              alt="logo"
              className="app-logo ms-lg-5"
              style={{ width: "60px" }}
            />
          </Link>
        </div>
        <form
          className="d-flex"
          role="search"
          style={{ width: "350px" }}
          id="search"
        >
          <input
            className=" me-2 search-bar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <div className="search-icon d-flex flex-column align-items-center px-sm-3 px-md-3 px-1 d-none">
          <IoSearch size={25} />
          <p
            className="m-0 fs-sm text-secondary"
            style={{ minWidth: "max-content" }}
          >
            Search
          </p>
        </div>

        <ul className="navbar-nav d-flex flex-row no-scrollbar">
          {navItems.map((navItem) => (
            <NavIcons
              icon={navItem.icon}
              name={navItem.name}
              href={navItem.href}
              key={navItem.name}
              className="px-sm-3 px-lg-2 px-2"
            />
          ))}
          <li className="nav-item px-sm-2 px-lg-1 px-2">
            <Link className="nav-link " to="notifications">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="position-relative">
                  <FaBell size={25} />
                  {!user.notifications.every(
                    (element) => element.read === true
                  ) && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {
                        user.notifications.filter(
                          (element) => element.read === false
                        ).length
                      }
                    </span>
                  )}
                </div>
                <p className="m-0 fs-sm" style={{ minWidth: "max-content" }}>
                  Notifications
                </p>
              </div>
            </Link>
          </li>
        </ul>
        <Dropdown />
        <div className="end-icons d-flex align-items-center">
          <div className="v-divider mx-1"></div>

          <ul className="navbar-nav d-flex flex-row no-scrollbar ms-sm-3 ms-1">
            <li className="nav-item">
              <Link className="nav-link " to="#">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <CgMenuGridR size={25} />
                  <p className="m-0 fs-sm" style={{ minWidth: "max-content" }}>
                    For Business
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
