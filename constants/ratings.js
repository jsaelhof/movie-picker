export const ratingsSource = {
  IMDB: 0,
  ROTTEN_TOMATOES: 1,
  METACRITIC: 2,
};

export const ratingsSourceReverseLookup = {
  0: "IMDB",
  1: "ROTTEN_TOMATOES",
  2: "METACRITIC",
};

export const omdbRatingsSource = {
  "Internet Movie Database": ratingsSource.IMDB,
  "Rotten Tomatoes": ratingsSource.ROTTEN_TOMATOES,
  Metacritic: ratingsSource.METACRITIC,
};

export const ratingsSources = [
  ratingsSource.IMDB,
  ratingsSource.ROTTEN_TOMATOES,
  ratingsSource.METACRITIC,
];

export const ratingsSourceImage = {
  [ratingsSource.IMDB]: "imdb.svg",
  [ratingsSource.ROTTEN_TOMATOES]: "rottentomatoes.svg",
  [ratingsSource.METACRITIC]: "metacritic.svg",
};
