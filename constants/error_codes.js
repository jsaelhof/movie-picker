export const errorCodes = {
  PICKING: "PICKING",
  NO_TITLE: "NO_TITLE",
};

export const errorMessage = {
  [errorCodes.PICKING]: "No movies are available to pick from.",
  [errorCodes.NO_TITLE]: "Title is required to add a movie",
  UNKNOWN: `Unknown error code: %%`,
};
