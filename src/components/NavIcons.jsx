import React from "react";
import { Link } from "react-router-dom";

const NavIcons = ({ icon, name, className = "mx-4", href = "#" }) => {
  return (
    <li className={`nav-item ${className}`}>
      <Link className="nav-link " to={href}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {icon}
          <p className="m-0 fs-sm" style={{ minWidth: "max-content" }}>
            {name}
          </p>
        </div>
      </Link>
    </li>
  );
};
export default NavIcons;
