import { useMutation } from "@apollo/client";
import { EDIT_MOVIE } from "../mutations";
import { cacheFilter, cacheInsert } from "./utils/cache-update-utils";

export const useMarkWatched = (onCompleted) => {
  const [markWatchedMutation, status] = useMutation(EDIT_MOVIE, {
    onCompleted,
    update(cache, { data: { editMovie } }) {
      // TODO: This should use cache.update to avoid filtering multiple lists
      cache.modify({
        fields: {
          movies(state = []) {
            return cacheFilter(state, editMovie.id);
          },
          watchedMovies(state = []) {
            return cacheInsert(state, editMovie.id);
          },
        },
      });
    },
  });
  return [markWatchedMutation, status];
};
