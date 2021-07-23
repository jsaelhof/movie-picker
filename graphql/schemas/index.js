import { gql } from "apollo-server-micro";

// TODO: watched, addedOn and editedOn are date strings. Is there a better way to handle this in graph?
export const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    runtime: Int
    source: Int
    genre: Int
    addedOn: String
    editedOn: String
    watchedOn: String
    locked: Boolean
  }

  type List {
    id: String!
    label: String!
  }

  input MovieInput {
    id: ID
    title: String
    runtime: Int
    source: Int
    genre: Int
    addedOn: String
    editedOn: String
    watchedOn: String
    locked: Boolean
  }

  type Query {
    lists: [List]
    movies(list: String!): [Movie]
    watchedMovies(list: String!): [Movie]
  }

  type Mutation {
    addMovie(movie: MovieInput!, list: String!): Movie
    editMovie(movie: MovieInput!, list: String!): Movie
    removeMovie(movieId: ID!, list: String!): Movie
    markWatched(movie: MovieInput!, list: String!): Movie
    undoWatched(movie: MovieInput!, list: String!): Movie
    editWatched(movie: MovieInput!, list: String!): Movie
  }
`;
