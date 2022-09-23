import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import { errorMessage } from "../constants/error_codes";
import ErrorDialog from "../components/error-dialog/error-dialog";
import FullDetail from "../components/full-detail/full-detail";
import { filter, conforms, sample, size, reject } from "lodash";
import { errorCodes } from "../constants/error_codes";

const useRandomPick = () => {
  const { movies, pick, setPick, clearPick } = useAppContext();
  const { query } = useRouter();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (movies && !pick) {
      const filters = {
        locked: (locked) => !locked,
      };

      if (query.minRuntime || query.maxRuntime) {
        filters.runtime = (runtime) =>
          runtime >= (query.minRuntime || 0) &&
          runtime <= (query.maxRuntime || Infinity);
      }

      const list = filter(movies, conforms(filters));

      if (size(list) === 0) {
        setError(errorCodes.PICKING);
      } else {
        const unpickedMovies = reject(list, ({ id }) => history.includes(id));

        if (unpickedMovies.length > 0) {
          const nextPick = sample(unpickedMovies);
          setHistory([...history, nextPick.id]);
          setPick(nextPick.id);
        } else {
          // Every movie is in the history already.
          // Clear the history and start over.
          // Keep the last movie as the first movie in the new history to prevent getting it again on the next pick.
          setHistory(history.slice(-1));
          clearPick();
        }
      }
    }
  }, [
    clearPick,
    history,
    movies,
    pick,
    query.maxRuntime,
    query.minRuntime,
    setPick,
  ]);

  if (error) {
    return { pick: null, error };
  } else {
    return { pick, error: null };
  }
};

export default function Home() {
  const { moviesById, clearPick } = useAppContext();

  // This is used to reset the pick in app state whne the page loads the first time.
  // Without this, when leaving the pick page and then picking again, the last pick will remain
  // in app state. This also means it does not conform to new pick options.
  // eslint-disable-next-line
  useEffect(() => clearPick, []);

  const { pick, error } = useRandomPick();

  return (
    <>
      {pick && <FullDetail movie={moviesById[pick]} />}

      {error && (
        <ErrorDialog
          open={!!error}
          content={
            errorMessage[error] || errorMessage.UNKNOWN.replace("%%", error)
          }
          onConfirm={() => setError(null)}
        />
      )}
    </>
  );
}
