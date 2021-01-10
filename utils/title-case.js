import capitalize from "lodash/capitalize";

export const titleCase = (str) => str.split(" ").map(capitalize).join(" ");
