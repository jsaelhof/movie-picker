import { gql, useMutation } from "@apollo/client";
import { isEqual } from "lodash";

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($movieId: ID!, $list: String!) {
    removeMovie(movieId: $movieId, list: $list) {
      id
    }
  }
`;

export const useRemoveMovie = (onError) => {
  const [removeMovie, status] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
      // TODO: This should use cache.update to avoid filtering multiple lists
      cache.modify({
        fields: {
          movies(state = [], { toReference }) {
            return state.filter(
              (ref) => !isEqual(ref, toReference(removeMovie))
            );
          },
        },
      });
    },
    onError,
  });

  return [removeMovie, status];
};

export const useRemoveWatchedMovie = ({ onError }) => {
  const [removeWatchedMovie, status] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
      // TODO: This should use cache.update to avoid filtering multiple lists
      cache.modify({
        fields: {
          watchedMovies(state = []) {
            return state.filter(
              ({ __ref }) => __ref !== `Movie:${removeMovie.id}`
            );
          },
        },
      });
    },
    onError,
  });

  return [removeWatchedMovie, status];
};

export const removeMovieOptions = (movie, list) => ({
  variables: {
    movieId: movie.id,
    list: list.id,
  },
});
