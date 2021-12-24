export const errorCodes = {
  PICKING: "PICKING",
  NO_TITLE: "NO_TITLE",
  NO_LIST_NAME: "NO_LIST_NAME",
};

export const errorMessage = {
  [errorCodes.PICKING]: "No movies are available to pick from.",
  [errorCodes.NO_TITLE]: "Title is required to add a movie",
  [errorCodes.NO_LIST_NAME]: "A name is required to add a list",
  UNKNOWN: `Unknown error code: %%`,
};
