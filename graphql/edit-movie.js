import { gql } from "@apollo/client";

export const EDIT_MOVIE = gql`
  mutation EditMovie($movie: MovieInput!, $db: String!) {
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
