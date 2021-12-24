import { gql } from "apollo-server-micro";

// TODO: watched, addedOn and editedOn are date strings. Is there a better way to handle this in graph?
export const typeDefs = gql`
  type Ratings {
    IMDB: String
    ROTTEN_TOMATOES: String
    METACRITIC: String
  }

  input RatingsInput {
    IMDB: String
    ROTTEN_TOMATOES: String
    METACRITIC: String
  }

  type Movie {
    id: ID!
    title: String!
    runtime: Int
    source: Int
    genre: Int
    year: String
    poster: String
    imdbID: String
    addedOn: String
    editedOn: String
    watchedOn: String
    locked: Boolean
    ratings: Ratings
    backdrop: String
    certification: String
    trailer: Trailer
    plot: String
  }

  type Trailer {
    site: String
    key: String
  }

  type Provider {
    imdbID: ID!
    provider: Int
  }

  type SearchResult {
    title: String
    year: String
    imdbID: String
    poster: String
  }

  type List {
    id: ID!
    label: String!
    userId: String!
  }

  input MovieInput {
    id: ID
    title: String
    runtime: Int
    source: Int
    genre: Int
    year: String
    poster: String
    imdbID: String
    addedOn: String
    editedOn: String
    watchedOn: String
    locked: Boolean
    ratings: RatingsInput
  }

  type Database {
    name: String
  }

  type Query {
    database: Database
    lists(userId: String!): [List]
    movies(list: String!): [Movie]
    watchedMovies(list: String!): [Movie]
    searchByTitle(title: String!): [SearchResult]
    omdbMovie(imdbID: ID!): Movie
    tmdbMovie(imdbID: ID!): Movie
    tmdbProvider(imdbID: ID!): Provider
  }

  type Mutation {
    addList(userId: String!, name: String!): List
    addMovie(movie: MovieInput!, list: String!): Movie
    editMovie(movie: MovieInput!, list: String!, removeKeys: [String]): Movie
    removeMovie(movieId: ID!, list: String!): Movie
  }
`;
