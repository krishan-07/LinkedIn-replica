const NavIcons = ({ icon, name }) => {
  return (
    <li className="nav-item mx-4">
      <a className="nav-link " href="#">
        <div className="d-flex flex-column justify-content-center align-items-center">
          {icon}
          <p className="m-0 fs-sm">{name}</p>
        </div>
      </a>
    </li>
  );
};
export default NavIcons;
