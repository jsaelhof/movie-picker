import { gql } from "apollo-server-micro";

// TODO: watched, addedOn and editedOn are date strings. Is there a better way to handle this in graph?
export const typeDefs = gql`
  type List {
    id: ID!
    label: String!
    userId: String!
  }

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
    imdbID: String
    title: String!
    list: String
    runtime: Int
    source: Int
    genre: Int
    year: String
    poster: String
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

  input MovieInput {
    id: ID
    imdbID: String
    title: String
    list: String
    runtime: Int
    source: Int
    genre: Int
    year: String
    poster: String
    addedOn: String
    editedOn: String
    watchedOn: String
    locked: Boolean
    ratings: RatingsInput
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

  type Query {
    lists: [List]
    movies(list: String!): [Movie]
    watchedMovies(list: String!): [Movie]
    searchByTitle(title: String!): [SearchResult]
    omdbMovie(imdbID: ID!): Movie
    tmdbMovie(imdbID: ID!): Movie
    tmdbProvider(imdbID: ID!): Provider
  }

  type Mutation {
    addList(name: String!): List
    addMovie(movie: MovieInput!, list: String!): Movie
    editMovie(movie: MovieInput!, list: String!, removeKeys: [String]): Movie
    removeMovie(movieId: ID!, list: String!): Movie
  }
`;
