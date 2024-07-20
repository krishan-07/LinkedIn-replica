import { Link } from "react-router-dom";
import demoImg from "../assets/demoimg.jpeg";

export const Body = ({ children }) => {
  return (
    <div className="container-md">
      <div className="row mt-4">{children}</div>
    </div>
  );
};

export const Column = ({ className, children }) => {
  return <div className={`${className}`}>{children}</div>;
};

export const ProfileImg = ({ size, name = "", image = demoImg }) => {
  return (
    <Link to={`/${name}`}>
      <img
        src={image}
        alt={name}
        style={{ height: `${size}`, width: `${size}`, borderRadius: "50px" }}
      />
    </Link>
  );
};
