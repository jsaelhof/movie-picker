import {
  fromOmdbSource,
  ratingsSources,
  ratingsSource,
} from "../constants/ratings";

const normalizeRating = (source, value) => {
  switch (source) {
    case ratingsSource.IMDB:
      return `${parseFloat(value.replace("/10", "")) * 10}%`;
    case ratingsSource.METACRITIC:
      return `${value.replace("/100", "")}%`;
    default:
      return value;
  }
};

export const convertOmdbRatings = (ratings) =>
  ratings
    .filter(({ Source }) => ratingsSources.includes(fromOmdbSource[Source]))
    .reduce((acc, { Source, Value }) => {
      acc[fromOmdbSource[Source]] = normalizeRating(
        fromOmdbSource[Source],
        Value
      );
      return acc;
    }, {});
