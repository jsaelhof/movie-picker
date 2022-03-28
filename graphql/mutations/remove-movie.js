import { gql, useMutation } from "@apollo/client";
import { isEqual } from "lodash";
import { GET_MOVIES } from "../queries";

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($movieId: ID!, $list: String!) {
    removeMovie(movieId: $movieId, list: $list) {
      id
      list
    }
  }
`;

export const useRemoveMovie = (onError) => {
  const [removeMovie, status] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
      cache.updateQuery(
        {
          query: GET_MOVIES,
          variables: { list: removeMovie.list },
        },
        ({ movies, watchedMovies }) => ({
          movies: movies.filter(({ id }) => id !== removeMovie.id),
          watchedMovies,
        })
      );
    },
    onError,
  });

  return [removeMovie, status];
};

export const useRemoveWatchedMovie = ({ onError }) => {
  const [removeWatchedMovie, status] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
      cache.updateQuery(
        {
          query: GET_MOVIES,
          variables: { list: removeMovie.list },
        },
        ({ movies, watchedMovies }) => ({
          movies,
          watchedMovies: watchedMovies.filter(
            ({ id }) => id !== removeMovie.id
          ),
        })
      );
    },
    onError,
  });

  return [removeWatchedMovie, status];
};

export const removeMovieOptions = ({ id, list }) => ({
  variables: {
    movieId: id,
    list,
  },
  optimisticResponse: {
    removeMovie: {
      id,
      list,
      __typename: "Movie",
    },
  },
});
