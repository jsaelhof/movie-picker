import { gql } from "@apollo/client";

export const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($imdbID: String!) {
    omdbMovie(imdbID: $imdbID) {
      title
      year
      runtime
      genre
      ratings {
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
      poster
    }
    tmdbProvider(imdbID: $imdbID) {
      provider
    }
  }
`;