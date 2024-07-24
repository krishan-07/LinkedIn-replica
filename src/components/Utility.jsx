import { Link } from "react-router-dom";
import demoImg from "../assets/defaultPfp.jpeg";

export const Body = ({ children }) => {
  return (
    <div className="container-md">
      <div className="row my-sm-4">{children}</div>
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

export function convertMonthYear(dateString) {
  // Split the dateString to extract year and month
  const [year, month] = dateString.split("-");

  // Create a new Date object using the year and month
  const date = new Date(year, month - 1); // month - 1 because Date month is zero-based

  // Format the date to 'MMM yyyy' using Intl.DateTimeFormat
  const options = { year: "numeric", month: "short" };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}

export const formatDateToYYYYMMM = () => {
  // Get the current date and time in milliseconds since the epoch
  const now = Date.now();

  // Create a new Date object using the current date and time
  const date = new Date(now);

  // Extract the year using the getFullYear() method
  const year = date.getFullYear();

  // Define an array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month using the getMonth() method and get the corresponding month name from the array
  const month = months[date.getMonth()];

  // Return the formatted string in "yyyy mmm" format
  return `${month} ${year}`;
};
