import { gql } from "apollo-server-micro";

// TODO: watched is a Date so it should be watchedOn
// TODO: watched, addedOn and editedOn are date strings. Is there a better way to handle this in graph?
export const typeDefs = gql`
  type Movie {
    _id: ID!
    title: String!
    runtime: Int
    source: Int
    genre: Int
    addedOn: String
    editedOn: String
    watched: String
    locked: Boolean
  }

  type DB {
    id: String!
    label: String!
  }

  input MovieInput {
    _id: ID
    title: String
    runtime: Int
    source: Int
    genre: Int
    addedOn: String
    editedOn: String
    watched: String
    locked: Boolean
  }

  type Query {
    dbs: [DB]
    movies(db: String!): [Movie]
    watchedMovies(db: String!): [Movie]
  }

  type Mutation {
    addMovie(movie: MovieInput!, db: String!): Movie
    removeMovie(movieId: ID!, db: String!, list: String!): Movie
    markWatched(movie: MovieInput!, db: String!): Movie
    undoWatched(movie: MovieInput!, db: String!): Movie
    editWatched(movie: MovieInput!, db: String!): Movie
  }
`;
