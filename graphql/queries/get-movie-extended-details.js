import { gql } from "@apollo/client";

export const GET_MOVIE_EXTENDED_DETAILS = gql`
  query GetMovieExtendedDetails($imdbID: ID!) {
    omdbMovie(imdbID: $imdbID) {
      imdbID
      plot
      ratings {
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
    tmdbMovie(imdbID: $imdbID) {
      imdbID
      title
      backdrop
      certification
      trailer {
        site
        key
      }
      plot
    }
  }
`;
