import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies($list: String!) {
    movies(list: $list) {
      id
      title
      runtime
      source
      genre
      locked
    }
    watchedMovies(list: $list) {
      id
      title
      watchedOn
    }
  }
`;
