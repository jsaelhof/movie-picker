import { gql, useQuery } from "@apollo/client";

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
      watchedOn
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
    watchedMovies(list: $list) {
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
      watchedOn
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
  }
`;

export const useGetMovies = (list) => {
  const { data, ...rest } = useQuery(GET_MOVIES, {
    skip: !list,
    variables: { list: list?.id },
  });

  return {
    ...data,
    ...rest,
  };
};
