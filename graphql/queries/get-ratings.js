import { gql } from "@apollo/client";

export const GET_RATINGS = gql`
  query GetMovieDetails($imdbID: ID!) {
    omdbMovie(imdbID: $imdbID) {
      ratings {
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
  }
`;
