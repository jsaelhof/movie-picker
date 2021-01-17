export const formatRuntime = (seconds, editingFormat = false) => {
  const [hours, minutes] = new Date(1000 * seconds)
    .toISOString()
    .substr(12, 4)
    .split(":");
  return editingFormat
    ? `${hours}:${minutes}`
    : hours === "0"
    ? `${minutes}m`
    : `${hours}h ${minutes}m`;
};
