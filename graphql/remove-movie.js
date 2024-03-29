import { gql } from "@apollo/client";

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($movieId: ID!, $list: String!) {
    removeMovie(movieId: $movieId, list: $list) {
      id
    }
  }
`;
