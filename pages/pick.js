import React, { useCallback, useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import { errorMessage } from "../constants/error_codes";
import ErrorDialog from "../components/error-dialog/error-dialog";
import Pick from "../components/pick/pick";
import { randomPick } from "../utils/random-pick";
import { Button } from "@material-ui/core";

export default withPageAuthRequired(function Home() {
  const { movies } = useAppContext();
  const { query } = useRouter();
  const [error, setError] = useState(null);
  const [pick, setPick] = useState(null);

  const pickMovie = useCallback(() => {
    try {
      setPick(randomPick(movies, query));
    } catch ({ message }) {
      setError(message);
    }
  });

  useEffect(() => {
    if (movies && !pick) {
      pickMovie();
    }
  }, [movies, pick]);

  if (!pick) return null;

  return (
    <>
      <Pick movie={pick} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="Primary" onClick={pickMovie}>
          Pick Again
        </Button>
      </div>

      <ErrorDialog
        open={!!error}
        content={
          errorMessage[error] || errorMessage.UNKNOWN.replace("%%", error)
        }
        onConfirm={() => setError(null)}
      />
    </>
  );
});
