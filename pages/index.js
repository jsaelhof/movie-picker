import { useMutation } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { map } from "lodash";

import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import { ADD_MOVIE, EDIT_MOVIE } from "../graphql";
import { useAppContext } from "../context/app-context";
import { useRemoveMovie } from "../hooks/use-remove-movie";
import { useEditMovie } from "../hooks/use-edit-movie";
import ActionBar from "../components/action-bar/action-bar";
import AddMovieDialog from "../components/add-movie-dialog/add-movie-dialog";
import ErrorDialog from "../components/error-dialog/error-dialog";
import Toast from "../components/toast/toast";
import ListGrid from "../components/list/list-grid";
import PageContainer from "../components/page-container/page-container";

const editMovieMutationOptions = (movie, list) => ({
  variables: { movie: omitTypename(movie), list: list.id },
  optimisticResponse: {
    editMovie: {
      ...movie,
      __typename: "Movie",
    },
  },
});

export default function Home() {
  const router = useRouter();
  const { list, movies, loadingMovies, lists } = useAppContext();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [enableEditMovie, setEnableEditMovie] = useState(null);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);

  const [undoWatched] = useMutation(EDIT_MOVIE, {
    onCompleted: ({ editMovie: movie }) => {
      setToastProps({
        message: `Moved '${movie.title}' back to movies list`,
      });
    },
    refetchQueries: ["GetMovies"],
  });

  const [markWatched] = useMutation(EDIT_MOVIE, {
    onCompleted: ({ editMovie: movie }) => {
      setToastProps({
        message: `Moved '${movie.title}' to watched list`,
        onUndo: async () => {
          undoWatched({
            variables: {
              movie: omitTypename(movie),
              list: list.id,
              removeKeys: ["watchedOn"],
            },
          });
        },
      });
    },
    refetchQueries: ["GetMovies"],
  });

  const [addMovie] = useMutation(ADD_MOVIE, {
    onCompleted: ({ addMovie: movie }) => {
      setToastProps({ message: `Added '${movie.title}'` });
    },
    onError: ({ message }) => {
      setError(message);
    },
    refetchQueries: ["GetMovies"],
  });

  const editMovieMutation = useEditMovie();
  const removeMovieMutation = useRemoveMovie(setError);

  const onPick = useCallback(
    (options) => {
      router.push(`/pick?${map(options, (v, k) => `${k}=${v}`).join("&")}`);
    },
    [router]
  );

  const onEnableAddMovie = useCallback(() => {
    setEnableAddMovie(true);
  }, []);

  const onCancelAddMovie = useCallback(() => {
    setEnableAddMovie(false);
  }, []);

  const onEnableEditMovie = useCallback(
    (movie, useEditor = true) =>
      useEditor
        ? setEnableEditMovie(movie)
        : editMovieMutation(editMovieMutationOptions(movie, list)),
    [editMovieMutation, list]
  );

  const onRemoveMovie = useCallback(
    (id) =>
      removeMovieMutation({
        variables: {
          movieId: id,
          list: list.id,
        },
      }),
    [list?.id, removeMovieMutation]
  );

  const onMarkWatched = useCallback(
    (movie) =>
      markWatched({
        variables: {
          movie: {
            ...omitTypename(movie),
            watchedOn: new Date().toISOString(),
          },
          list: list.id,
        },
      }),
    [list?.id, markWatched]
  );

  const onCloseToast = useCallback(() => setToastProps(null), []);

  const onAddMovie = useCallback(
    (movie) => {
      addMovie({
        variables: { movie: omitTypename(movie), list: list.id },
      });
      setEnableAddMovie(false);
    },
    [addMovie, list?.id]
  );

  const onEditMovie = useCallback(
    (movie) => {
      editMovieMutation(editMovieMutationOptions(movie, list));
      setEnableEditMovie(false);
    },
    [editMovieMutation, list]
  );

  const onCancelEditMovie = useCallback(() => {
    setEnableEditMovie(false);
  }, []);

  if (lists?.length === 0) router.replace("/create");

  return (
    <>
      <PageContainer>
        <ActionBar
          disabled={!movies || loadingMovies || movies?.length === 0}
          onAdd={onEnableAddMovie}
          onPick={onPick}
        />

        {movies && (
          <ListGrid
            movies={movies}
            onAddMovie={onEnableAddMovie}
            onEditMovie={onEnableEditMovie}
            onRemoveMovie={onRemoveMovie}
            onMarkWatched={onMarkWatched}
          />
        )}
      </PageContainer>

      <Toast
        open={toastProps !== null}
        onClose={onCloseToast}
        {...toastProps}
      />

      <ErrorDialog
        open={!!error}
        content={
          errorMessage[error] || errorMessage.UNKNOWN.replace("%%", error)
        }
        onConfirm={() => setError(null)}
      />

      {enableAddMovie && (
        <AddMovieDialog onAddMovie={onAddMovie} onCancel={onCancelAddMovie} />
      )}

      {enableEditMovie && (
        <AddMovieDialog
          movie={enableEditMovie}
          onAddMovie={onEditMovie}
          onCancel={onCancelEditMovie}
        />
      )}
    </>
  );
}
