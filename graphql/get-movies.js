import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies($db: String!) {
    movies(db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
    }
    watchedMovies(db: $db) {
      _id
      title
      watched
    }
  }
`;
