import { ratingsSource } from "../constants/ratings";

export const normalizeRating = (source, value) => {
  switch (source) {
    case ratingsSource.IMDB:
      return `${parseFloat(value.replace("/10", "")) * 10}%`;
    case ratingsSource.METACRITIC:
      return `${value.replace("/100", "")}%`;
    default:
      return value;
  }
};
