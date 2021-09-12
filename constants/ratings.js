export const ratingsSource = {
  IMDB: "IMDB",
  ROTTEN_TOMATOES: "ROTTEN_TOMATOES",
  METACRITIC: "METACRITIC",
};

export const fromOmdbSource = {
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
