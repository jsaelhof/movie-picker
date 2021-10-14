import { gql } from "@apollo/client";

export const GET_MOVIE_EXTENDED_DETAILS = gql`
  query GetMovieExtendedDetails($imdbID: String!) {
    omdbMovie(imdbID: $imdbID) {
      plot
    }
    tmdbMovie(imdbID: $imdbID) {
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
