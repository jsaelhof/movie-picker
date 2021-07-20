import { gql } from "@apollo/client";

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($movieId: ID!, $db: String!, $list: String!) {
    removeMovie(movieId: $movieId, db: $db, list: $list) {
      _id
    }
  }
`;
