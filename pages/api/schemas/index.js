import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Movie {
    _id: ID
    title: String!
    runtime: Int
    source: Int
    locked: Boolean
  }

  type Query {
    getMovies(db: String!): [Movie]
    getMovie(db: String!, title: String, id: String): Movie
    pick(db: String!): Movie
  }
`;
