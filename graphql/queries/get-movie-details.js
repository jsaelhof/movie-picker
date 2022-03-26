import { gql, useQuery } from "@apollo/client";

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

export const useGetMovieDetails = (movie, { onCompleted }) => {
  return useQuery(GET_MOVIE_DETAILS, {
    skip: !movie || !movie?.imdbID,
    variables: { imdbID: movie?.imdbID },
    onCompleted: ({ omdbMovie, tmdbProvider }) => {
      onCompleted({
        ...omdbMovie,
        ...(tmdbProvider && { source: tmdbProvider.provider }),
      });
    },
  });
};
