import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $db: String!) {
    addMovie(movie: $movie, db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
    }
  }
`;
