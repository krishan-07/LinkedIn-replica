import React from "react";
import logo from "../assets/appLogo.png";
import NavIcon from "./NavIcon";
import { MdPeopleAlt } from "react-icons/md";
import { RiNewsLine } from "react-icons/ri";
import { BsCollectionPlay } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { FaPuzzlePiece } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
        <Link className="navbar-brand order-1 " to="/">
          <img src={logo} alt="logo" className="app-logo mx-sm-5" />
        </Link>
        <ul className="navbar-nav ms-auto d-flex flex-row mt-1 second no-scrollbar">
          {navItems.map((navItem) => (
            <NavIcon
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
            <Link className="nav-link " to="#">
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ minWidth: "80px" }}
              >
                <FaLaptop size={25} />
                <p className="m-0 fs-sm">Get the app</p>
              </div>
            </Link>
          </li>
        </ul>
        <div className="third">
          <Link className="btn login-btn mx-2" to="/signup">
            Join now
          </Link>
          <Link className="btn signup-btn me-sm-5" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavBar;
