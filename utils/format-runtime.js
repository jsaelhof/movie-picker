export const formatRuntime = (seconds) => {
  const [hours, minutes] = new Date(1000 * seconds)
    .toISOString()
    .substr(12, 4)
    .split(":");
  return hours === "0" ? `${minutes}m` : `${hours}h ${minutes}m`;
};
