import { gql } from "@apollo/client";

export const EDIT_MOVIE = gql`
  mutation EditMovie($movie: MovieInput!, $list: String!) {
    editMovie(movie: $movie, list: $list) {
      id
      title
      runtime
      source
      genre
      locked
    }
  }
`;
