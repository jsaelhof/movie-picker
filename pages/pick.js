import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import { errorMessage } from "../constants/error_codes";
import ErrorDialog from "../components/error-dialog/error-dialog";
import Pick from "../components/pick/pick";
import { randomPick } from "../utils/random-pick";

export default function Home() {
  const { movies, pick, setPick } = useAppContext();
  const { query } = useRouter();
  const [error, setError] = useState(null);

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
      <Pick movie={pick} />

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
