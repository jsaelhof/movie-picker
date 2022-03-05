import { useCallback, useEffect, useMemo, useState } from "react";
import isNil from "lodash/isNil";

import { Container } from "./watched-list.styles";
import { errorMessage } from "../../constants/error_codes";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ErrorDialog from "../error-dialog/error-dialog";
import WatchedMovie from "./watched-movie";
import { orderBy } from "lodash";
import { useEditMovie } from "../../hooks/use-edit-movie";
import { useRemoveMovie } from "../../hooks/use-remove-movie";
import { useAppContext } from "../../context/app-context";
import { omitTypename } from "../../utils/omit-typename";

const INFINITE_LOAD_CHUNK_SIZE = 5;

const WatchedList = ({ movies }) => {
  const { list } = useAppContext();
  const [error, setError] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const [infiniteLoadPointer, setInfiniteLoadPointer] = useState(
    Math.min(movies.length, INFINITE_LOAD_CHUNK_SIZE)
  );

  const sortedMovies = useMemo(
    () => orderBy(movies, "watchedOn", ["desc"]),
    [movies]
  );

  useEffect(() => {
    const onScroll = ({ target: { documentElement } }) => {
      if (
        documentElement.scrollHeight - documentElement.scrollTop ===
        documentElement.clientHeight
      ) {
        setInfiniteLoadPointer(
          Math.min(
            movies.length,
            infiniteLoadPointer + INFINITE_LOAD_CHUNK_SIZE
          )
        );
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [infiniteLoadPointer, movies.length]);

  const editMovie = useEditMovie();
  const removeMovie = useRemoveMovie(setError);

  const onEditMovie = useCallback(({ id }) => setEditingMovie(id), []);

  const onSaveMovie = useCallback(
    (movie) => {
      editMovie({
        variables: { movie: omitTypename(movie), list: list.id },
        optimisticResponse: {
          editMovie: {
            ...movie,
            __typename: "Movie",
          },
        },
      });
      setEditingMovie(null);
    },
    [editMovie, list.id]
  );

  const onCancelEdit = useCallback(() => setEditingMovie(null), []);

  const onDeleteMovie = useCallback(({ id }) => {
    setDeleteMovie(id);
  }, []);

  return movies ? (
    <>
      <Container>
        {sortedMovies.map(
          (movie, i) =>
            i < infiniteLoadPointer && (
              <WatchedMovie
                key={movie.id}
                movie={movie}
                right={i % 2}
                isEditing={editingMovie === movie.id}
                onEditMovie={onEditMovie}
                onSave={onSaveMovie}
                onCancel={onCancelEdit}
                onDelete={onDeleteMovie}
              />
            )
        )}
      </Container>

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Remove Watched Movie?"
        content={`'${
          movies.find(({ id }) => id === deleteMovie)?.title
        }' will be removed from the Watched Movies list`}
        onCancel={() => setDeleteMovie(null)}
        onConfirm={() => {
          removeMovie({
            variables: {
              movieId: deleteMovie,
              list: list.id,
            },
          });
          setDeleteMovie(null);
        }}
      />

      <ErrorDialog
        open={!!error}
        content={
          errorMessage[error] || errorMessage.UNKNOWN.replace("%%", error)
        }
        onConfirm={() => setError(null)}
      />
    </>
  ) : null;
};

export default WatchedList;
