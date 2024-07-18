import { FaCloud } from "react-icons/fa6";

const Footer = ({ className = "" }) => {
  const items = [
    "About",
    "Accessibility",
    "User Agreement",
    " Privacy Policy",
    "Cookie Policy",
    "Copyright Policy",
    "Brand Policy",
    "Guest Controls",
    "Community Guidelines",
  ];
  return (
    <footer className="d-flex flex-wrap justify-content-center align-items-center my-4 border-top">
      <p className=" mb-0 me-4">
        <span className="me-2 ">
          {" "}
          <FaCloud size={25} />
        </span>
        © 2024
      </p>
      <ul className="nav justify-content-center">
        {items.map((item) => (
          <li className="nav-item" key={item}>
            <a
              href="#"
              className={`nav-link px-2 text-body-secondary ${className}`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
