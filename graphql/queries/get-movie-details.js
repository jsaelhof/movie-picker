import { gql, useQuery } from "@apollo/client";
import { noop } from "lodash";

const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($imdbID: ID!) {
    omdbMovie(imdbID: $imdbID) {
      imdbID
      title
      year
      runtime
      genre
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
      poster
    }
    tmdbProvider(imdbID: $imdbID) {
      imdbID
      provider
    }
  }
`;

export const useGetMovieDetails = (movie, { onCompleted = noop } = {}) => {
  const { data, ...rest } = useQuery(GET_MOVIE_DETAILS, {
    skip: !movie || !movie?.imdbID,
    variables: { imdbID: movie?.imdbID },
    onCompleted: ({ omdbMovie, tmdbProvider }) => {
      onCompleted({
        ...omdbMovie,
        ...(tmdbProvider && { source: tmdbProvider.provider }),
      });
    },
  });

  return {
    data: {
      ...data?.omdbMovie,
      ...(data?.tmdbProvider && { source: data.tmdbProvider.provider }),
    },
    ...rest,
  };
};
