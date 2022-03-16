import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies($list: String!) {
    movies(list: $list) {
      id
      title
      list
      runtime
      source
      genre
      year
      poster
      imdbID
      locked
      addedOn
      ratings {
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
    watchedMovies(list: $list) {
      id
      title
      watchedOn
      poster
      imdbID
    }
  }
`;
