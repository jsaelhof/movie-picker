import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import { errorMessage } from "../constants/error_codes";
import ErrorDialog from "../components/error-dialog/error-dialog";
import FullDetail from "../components/full-detail/full-detail";
import { filter, conforms, sample, size } from "lodash";
import { errorCodes } from "../constants/error_codes";

const useRandomPick = () => {
  const { movies, pick, setPick } = useAppContext();
  const { query } = useRouter();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (movies && !pick) {
      const filters = {
        locked: (locked) => !locked,
      };

      if (!query.minRuntime || !query.maxRuntime) {
        filters.runtime = (runtime) =>
          runtime >= (query.minRuntime || 0) &&
          runtime <= (query.maxRuntime || Infinity);
      }

      const list = filter(movies, conforms(filters));

      if (size(list) === 0) {
        setError(errorCodes.PICKING);
      } else {
        // Recursive function to pick a movie that has not been picked before.
        // Once every eligible movie has been picked, it will clear and start over.
        const pickFunc = () => {
          // Get a random movie.
          const nextPick = sample(list);

          // If the movie is in the history, call again.
          if (history.includes(nextPick.id)) {
            if (history.length === list.length) {
              // Every movie is in the history already.
              // Clear the history and start over.
              // Keep the last movie as the first movie in the new history to prevent getting it again on the next pick.
              setHistory(history.slice(-1));
            } else {
              // Try another movie.
              pickFunc();
            }
          } else {
            // This movie has not been seen in this rotation.
            // Add it to the history and use it.
            setHistory([...history, nextPick.id]);
            setPick(nextPick);
          }
        };

        pickFunc();
      }
    }
  }, [history, movies, pick, query.maxRuntime, query.minRuntime, setPick]);

  if (error) {
    return { data: null, error };
  } else {
    return { data: pick, error: null };
  }
};

export default function Home() {
  const { pick, setPick } = useAppContext();

  // This is used to reset the pick in app state whne the page loads the first time.
  // Without this, when leaving the pick page and then picking again, the last pick will remain
  // in app state. This also means it does not conform to new pick options.
  // eslint-disable-next-line
  useEffect(() => setPick(null), []);

  const { error } = useRandomPick();

  return (
    <>
      {pick && <FullDetail movie={pick} />}

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
