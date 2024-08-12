export default function formatDateToYYYYMMM() {
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
}
