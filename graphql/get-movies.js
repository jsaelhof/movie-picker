import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies($list: String!) {
    movies(list: $list) {
      id
      title
      runtime
      source
      genre
      year
      poster
      imdbID
      locked
      addedOn
    }
    watchedMovies(list: $list) {
      id
      title
      watchedOn
    }
  }
`;
