import { gql, useQuery } from "@apollo/client";

const GET_MOVIE_EXTENDED_DETAILS = gql`
  query GetMovieExtendedDetails($imdbID: ID!) {
    omdbMovie(imdbID: $imdbID) {
      imdbID
      title
      rated
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
    tmdbMovie(imdbID: $imdbID) {
      imdbID
      backdrop
      trailer {
        site
        key
      }
      plot
    }
  }
`;

export const useGetMovieExtendedDetails = (movie) => {
  const { data, ...rest } = useQuery(GET_MOVIE_EXTENDED_DETAILS, {
    skip: !movie.imdbID,
    errorPolicy: "all",
    variables: {
      imdbID: movie.imdbID,
    },
  });

  return {
    data: { ...data?.omdbMovie, ...data?.tmdbMovie },
    ...rest,
  };
};
