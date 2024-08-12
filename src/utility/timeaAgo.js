export default function timeAgo(postTimestamp) {
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
