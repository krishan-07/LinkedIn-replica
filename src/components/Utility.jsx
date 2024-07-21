import { Link } from "react-router-dom";
import demoImg from "../assets/defaultPfp.jpeg";

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
  const linkName = name;
  const link = linkName.split(" ").join("").toLowerCase();
  return (
    <Link to={link === "" ? "#" : `/${link}`}>
      <img
        src={image}
        alt={name}
        style={{ height: `${size}`, width: `${size}`, borderRadius: "50%" }}
      />
    </Link>
  );
};

export function timeAgo(postTimestamp) {
  const currentTime = new Date();
  const postTime = new Date(postTimestamp);
  const timeDifference = currentTime - postTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}
