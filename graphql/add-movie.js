import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $list: String!) {
    addMovie(movie: $movie, list: $list) {
      id
      title
      runtime
      source
      genre
      locked
    }
  }
`;
