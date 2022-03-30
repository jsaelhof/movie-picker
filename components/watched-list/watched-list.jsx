import { useCallback, useEffect, useMemo, useState } from "react";
import isNil from "lodash/isNil";

import { Container } from "./watched-list.styles";
import { errorMessage } from "../../constants/error_codes";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ErrorDialog from "../error-dialog/error-dialog";
import WatchedMovie from "./watched-movie";
import { orderBy } from "lodash";
import { useAppContext } from "../../context/app-context";
import {
  editMovieOptions,
  removeMovieOptions,
  useEditMovie,
  useRemoveWatchedMovie,
} from "../../graphql/mutations";

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

  const [editMovieMutation] = useEditMovie();
  const [removeMovieMutation] = useRemoveWatchedMovie({
    onError: ({ message }) => {
      setError(message);
    },
  });

  const onEditMovie = useCallback(({ id }) => setEditingMovie(id), []);

  const onSaveMovie = useCallback(
    (movie) => {
      editMovieMutation(editMovieOptions(movie, list));
      setEditingMovie(null);
    },
    [editMovieMutation, list]
  );

  const onCancelEdit = useCallback(() => setEditingMovie(null), []);

  const onDeleteMovie = useCallback((movie) => {
    setDeleteMovie(movie);
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
        content={`'${deleteMovie?.title}' will be removed from the Watched Movies list`}
        onCancel={() => setDeleteMovie(null)}
        onConfirm={() => {
          removeMovieMutation(removeMovieOptions(deleteMovie));
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
