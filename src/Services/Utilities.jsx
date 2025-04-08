const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short" };
  return date.toLocaleString("en-US", options);
};

function timeAgo(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diff = now.getTime() - postDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  if (years > 0) return `${years} years ago`;
  if (years === 0) return `${months} months ago`;
  if (months === 0) return `${days} days ago`;
  if (days === 0) return `${hours} hours ago`;
  if (hours === 0) return `${minutes} minutes ago`;
  if (minutes === 0) return `${seconds} seconds ago`;
  if (seconds === 0) return `Just now`;
  return `${seconds} seconds ago`;
}

export { formatDate, timeAgo };
