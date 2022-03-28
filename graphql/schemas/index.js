import { gql } from "apollo-server-micro";

// TODO: watched, addedOn and editedOn are date strings. Is there a better way to handle this in graph?
export const typeDefs = gql`
  type List {
    id: ID!
    label: String!
    userId: String!
  }

  type Ratings {
    id: ID!
    IMDB: String
    ROTTEN_TOMATOES: String
    METACRITIC: String
  }

  input RatingsInput {
    id: ID!
    IMDB: String
    ROTTEN_TOMATOES: String
    METACRITIC: String
  }

  type Movie {
    id: ID!
    imdbID: String
    title: String!
    list: String
    runtime: Int
    source: Int
    genre: Int
    year: String
    poster: String
    addedOn: String
    watchedOn: String
    locked: Boolean
    ratings: Ratings
  }

  input MovieInput {
    id: ID!
    imdbID: String
    title: String
    list: String
    runtime: Int
    source: Int
    genre: Int
    year: String
    poster: String
    addedOn: String
    watchedOn: String
    locked: Boolean
    ratings: RatingsInput
  }

  type Trailer {
    site: String
    key: String
  }

  type SearchResult {
    title: String
    year: String
    imdbID: String
    poster: String
  }

  type OmdbMovie {
    imdbID: ID!
    title: String
    year: String
    runtime: Int
    genre: Int
    ratings: OmdbRatings
    poster: String
  }

  type OmdbRatings {
    id: ID!
    IMDB: String
    ROTTEN_TOMATOES: String
    METACRITIC: String
  }

  type TmdbMovie {
    imdbID: ID!
    title: String
    backdrop: String
    certification: String
    trailer: TmdbTrailer
    plot: String
    provider: String
  }

  type TmdbTrailer {
    site: String
    key: ID!
  }

  type Query {
    lists: [List]
    movies(list: String!): [Movie]
    watchedMovies(list: String!): [Movie]
    searchByTitle(title: String!): [SearchResult]
    omdbMovie(imdbID: ID!): OmdbMovie
    tmdbMovie(imdbID: ID!): TmdbMovie
  }

  type Mutation {
    addList(name: String!): List
    addMovie(movie: MovieInput!, list: String!): Movie
    editMovie(movie: MovieInput!, list: String!, removeKeys: [String]): Movie
    removeMovie(movieId: ID!, list: String!): Movie
    updateMovie(movieId: ID!, list: String!): Movie
  }
`;
