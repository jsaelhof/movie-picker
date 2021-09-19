import { isNil } from "lodash";

export const formatRuntime = (seconds, editingFormat = false) => {
  if (isNil) return "";

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
