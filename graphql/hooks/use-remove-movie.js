import { useMutation } from "@apollo/client";
import { REMOVE_MOVIE } from "../mutations";
import { isEqual } from "lodash";

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
