import { useMutation } from "@apollo/client";
import { REMOVE_MOVIE } from "../mutations";

export const useRemoveWatchedMovie = (onError) => {
  const [removeWatchedMovie, status] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
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
