import { useMutation } from "@apollo/client";
import { REMOVE_MOVIE } from "../mutations";

export const useRemoveMovie = (onError) => {
  const [removeMovie, status] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
      cache.modify({
        fields: {
          movies(state = []) {
            return state.filter(
              ({ __ref }) => __ref !== `Movie:${removeMovie.id}`
            );
          },
        },
      });
    },
    onError,
  });

  return [removeMovie, status];
};
