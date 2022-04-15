import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import { errorMessage } from "../constants/error_codes";
import ErrorDialog from "../components/error-dialog/error-dialog";
import FullDetail from "../components/full-detail/full-detail";
import { randomPick } from "../utils/random-pick";

export default function Home() {
  const { movies, pick, setPick } = useAppContext();
  const { query } = useRouter();
  const [error, setError] = useState(null);

  // This is used to reset the pick in app state whne the page loads the first time.
  // Without this, when leaving the pick page and then picking again, the last pick will remain
  // in app state. This also means it does not conform to new pick options.
  // eslint-disable-next-line
  useEffect(() => setPick(null), []);

  useEffect(() => {
    const pickMovie = () => {
      try {
        setPick(randomPick(movies, query));
      } catch ({ message }) {
        setError(message);
      }
    };

    if (movies && !pick) {
      pickMovie();
    }
  }, [movies, pick, query, setPick]);

  if (!pick) return null;

  return (
    <>
      <FullDetail movie={pick} />

      <ErrorDialog
        open={!!error}
        content={
          errorMessage[error] || errorMessage.UNKNOWN.replace("%%", error)
        }
        onConfirm={() => setError(null)}
      />
    </>
  );
}
