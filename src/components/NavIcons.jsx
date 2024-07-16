const NavIcons = ({ icon, name, className = "mx-4", href = "/" }) => {
  return (
    <li className={`nav-item ${className}`}>
      <a className="nav-link " href={href}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {icon}
          <p className="m-0 fs-sm" style={{ minWidth: "max-content" }}>
            {name}
          </p>
        </div>
      </a>
    </li>
  );
};
export default NavIcons;
