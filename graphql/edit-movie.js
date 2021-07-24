import { gql } from "@apollo/client";

export const EDIT_MOVIE = gql`
  mutation EditMovie(
    $movie: MovieInput!
    $list: String!
    $removeKeys: [String]
  ) {
    editMovie(movie: $movie, list: $list, removeKeys: $removeKeys) {
      id
      title
      runtime
      source
      genre
      locked
    }
  }
`;
