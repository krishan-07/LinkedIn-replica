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
