import { gql, useQuery } from "@apollo/client";
import { noop } from "lodash";

const GET_MOVIE_EXTENDED_DETAILS = gql`
  query GetMovieExtendedDetails($imdbID: ID!) {
    omdbMovie(imdbID: $imdbID) {
      imdbID
      ratings {
        id
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

export const useGetMovieExtendedDetails = (
  movie,
  { onCompleted = noop, onError = noop } = {}
) => {
  return useQuery(GET_MOVIE_EXTENDED_DETAILS, {
    skip: !movie.imdbID,
    errorPolicy: "all",
    variables: {
      imdbID: movie.imdbID,
    },
    onCompleted: ({ tmdbMovie, omdbMovie }) =>
      onCompleted({ ...omdbMovie, ...tmdbMovie }),
    onError,
  });
};
