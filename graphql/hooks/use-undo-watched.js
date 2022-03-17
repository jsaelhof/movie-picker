import { useMutation } from "@apollo/client";
import { EDIT_MOVIE } from "../mutations";
import { cacheFilter, cacheInsert } from "./utils/cache-update-utils";

export const useUndoWatched = (onCompleted) => {
  const [undoWatchedMutation, status] = useMutation(EDIT_MOVIE, {
    onCompleted,
    // TODO: This should use cache.update to avoid filtering multiple lists
    update(cache, { data: { editMovie } }) {
      cache.modify({
        fields: {
          movies(state = []) {
            return cacheInsert(state, editMovie.id);
          },
          watchedMovies(state = []) {
            return cacheFilter(state, editMovie.id);
          },
        },
      });
    },
  });
  return [undoWatchedMutation, status];
};
