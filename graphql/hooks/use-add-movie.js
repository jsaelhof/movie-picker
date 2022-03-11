import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../mutations";
import { cacheInsert } from "./utils/cache-update-utils";

export const useAddMovie = (onCompleted, onError) => {
  const [addMovieMutation, status] = useMutation(ADD_MOVIE, {
    onCompleted,
    onError,
    update(cache, { data: { addMovie } }) {
      cache.modify({
        fields: {
          movies(state = []) {
            return cacheInsert(state, addMovie.id);
          },
        },
      });
    },
  });
  return [addMovieMutation, status];
};
