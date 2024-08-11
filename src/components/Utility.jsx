import { Link } from "react-router-dom";
import demoImg from "../assets/defaultPfp.jpeg";
import store from "./../store/index.js";

export const Body = ({ children }) => {
  return (
    <div className="container-md">
      <div className="row mt-sm-4">{children}</div>
    </div>
  );
};

export const Column = ({ className, children }) => {
  return <div className={`${className}`}>{children}</div>;
};

export const ProfileImg = ({
  size,
  name = "",
  image = demoImg,
  disable = "",
}) => {
  return (
    <>
      {disable !== true ? (
        <Link to={`/in/${name}`}>
          <img
            src={image}
            alt={name}
            style={{ height: `${size}`, width: `${size}`, borderRadius: "50%" }}
          />
        </Link>
      ) : (
        <img
          src={image}
          alt={name}
          style={{ height: `${size}`, width: `${size}`, borderRadius: "50%" }}
        />
      )}
    </>
  );
};

export const nameToLink = (name) => {
  return name.split(" ").join("").toLowerCase();
};

export function timeAgo(postTimestamp) {
  const currentTime = new Date();
  const postTime = new Date(postTimestamp);
  const timeDifference = currentTime - postTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks}w`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    if (seconds === 0) return "now";
    else return `${seconds}s`;
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

export const searchData = (data) => {
  if (data === "") return [];
  const state = store.getState();
  const usersData = state.usersData;
  const startsWithData = usersData.filter(
    (user) =>
      user.name.toLowerCase().startsWith(data.toLowerCase()) ||
      user.userName.toLowerCase().startsWith(data.toLowerCase())
  );
  const containsData = usersData.filter(
    (user) =>
      !startsWithData.includes(user) &&
      user.name.toLowerCase().includes(data.toLowerCase())
  );
  return [...startsWithData, ...containsData];
};
