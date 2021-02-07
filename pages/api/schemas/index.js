import {gql} from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Movie {
    _id: ID
    title: String!
    runtime: Int
    source: Int
  }

  type Query {
    getMovies: [Movie]
    pick: Movie
    getUsers: [User]
    getUser(name: String!): User!
  }
`;
