import logo from "../assets/appLogo.png";
import NavIcons from "./NavIcons";
import { MdPeopleAlt } from "react-icons/md";
import { RiNewsLine } from "react-icons/ri";
import { BsCollectionPlay } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { FaPuzzlePiece } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa6";

const LandingPageNavBar = () => {
  const navItems = [
    {
      icon: <RiNewsLine size={25} />,
      name: "Articles",
    },
    {
      icon: <MdPeopleAlt size={25} />,
      name: "People",
    },
    {
      icon: <BsCollectionPlay size={25} />,
      name: "Learning",
    },
    {
      icon: <PiBagFill size={25} />,
      name: "Jobs",
    },
    {
      icon: <FaPuzzlePiece size={25} />,
      name: "Games",
    },
  ];

  return (
    <nav className="navbar flex bg-white p-0">
      <div className="container-fluid bg-white py-2 custom-order">
        <a className="navbar-brand order-1 " href="#">
          <img src={logo} alt="logo" className="app-logo mx-sm-5" />
        </a>
        <ul className="navbar-nav ms-auto d-flex flex-row mt-1 second no-scrollbar">
          {navItems.map((navItem) => (
            <NavIcons
              icon={navItem.icon}
              name={navItem.name}
              key={navItem.name}
            />
          ))}
          <li
            className="nav-item mx-2 px-3"
            style={{
              borderLeft: "1px solid lightgrey",
              borderRight: "1px solid lightgrey",
            }}
          >
            <a className="nav-link " href="#">
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ minWidth: "80px" }}
              >
                <FaLaptop size={25} />
                <p className="m-0 fs-sm">Get the app</p>
              </div>
            </a>
          </li>
        </ul>
        <div className="third">
          <a className="btn login-btn mx-2" href="/login">
            Join now
          </a>
          <a className="btn signup-btn me-sm-5" href="/signup">
            Sign in
          </a>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavBar;
