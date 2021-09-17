import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Container from "@material-ui/core/Container";

import { useAppContext } from "../context/app-context";
import { useRemoveMovie } from "../hooks/use-remove-movie";
import { useEditMovie } from "../hooks/use-edit-movie";
import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import ErrorDialog from "../components/error-dialog/error-dialog";
import WatchedList from "../components/watched-list/watched-list";

export default withPageAuthRequired(function Home() {
  const { list, watchedMovies } = useAppContext();
  const [error, setError] = useState(null);

  const editMovie = useEditMovie();
  const removeMovie = useRemoveMovie(setError);

  return (
    <>
      <Container>
        {watchedMovies && (
          <WatchedList
            movies={watchedMovies}
            onEditMovie={(movie) =>
              editMovie({
                variables: { movie: omitTypename(movie), list: list.id },
              })
            }
            onRemoveMovie={(id) =>
              removeMovie({
                variables: {
                  movieId: id,
                  list: list.id,
                },
              })
            }
          />
        )}
      </Container>

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
