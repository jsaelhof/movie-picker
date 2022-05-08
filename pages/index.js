import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { map } from "lodash";
import { animated, useSpring, useTransition } from "react-spring";

import { errorMessage } from "../constants/error_codes";
import { useAppContext } from "../context/app-context";
import ActionBar from "../components/action-bar/action-bar";
import AddMovieDialog from "../components/add-movie-dialog/add-movie-dialog";
import ErrorDialog from "../components/error-dialog/error-dialog";
import Toast from "../components/toast/toast";
import ListGrid from "../components/list/list-grid";
import PageContainer from "../components/page-container/page-container";
import {
  addMovieOptions,
  editMovieOptions,
  markWatchedOptions,
  undoMarkWatchedOptions,
  removeMovieOptions,
  useAddMovie,
  useEditMovie,
  useMarkWatched,
  useRemoveMovie,
  useUndoMarkWatched,
} from "../graphql/mutations";
import { Countdown } from "../components/countdown/countdown";

export default function Home() {
  const router = useRouter();
  const { list, movies, loadingMovies, lists } = useAppContext();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [enableEditMovie, setEnableEditMovie] = useState(null);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);

  const [undoMarkWatchedMutation] = useUndoMarkWatched({
    onCompleted: ({ editMovie: movie }) => {
      setToastProps({
        message: `Moved '${movie.title}' back to movies list`,
      });
    },
  });

  const [markWatchedMutation] = useMarkWatched({
    onCompleted: ({ editMovie: movie }) => {
      setToastProps({
        message: `Moved '${movie.title}' to watched list`,
        onUndo: () => {
          undoMarkWatchedMutation(undoMarkWatchedOptions(movie, list));
        },
      });
    },
  });

  const [addMovieMutation] = useAddMovie({
    onCompleted: ({ addMovie: movie }) => {
      setToastProps({ message: `Added '${movie.title}'` });
    },
    onError: ({ message }) => {
      setError(message);
    },
  });

  const [editMovieMutation] = useEditMovie();
  const [removeMovieMutation] = useRemoveMovie(({ message }) => {
    setError(message);
  });

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
        : editMovieMutation(editMovieOptions(movie, list)),
    [editMovieMutation, list]
  );

  const onRemoveMovie = useCallback(
    (movie) => removeMovieMutation(removeMovieOptions(movie)),
    [removeMovieMutation]
  );

  const onMarkWatched = useCallback(
    (movie) => {
      const watchedOn = new Date().toISOString();
      markWatchedMutation(markWatchedOptions(movie, watchedOn, list));
    },
    [list, markWatchedMutation]
  );

  const onCloseToast = useCallback(() => setToastProps(null), []);

  const onAddMovie = useCallback(
    (movie) => {
      addMovieMutation(addMovieOptions(movie, list));
      setEnableAddMovie(false);
    },
    [addMovieMutation, list]
  );

  const onEditMovie = useCallback(
    (movie) => {
      editMovieMutation(editMovieOptions(movie, list));
      setEnableEditMovie(false);
    },
    [editMovieMutation, list]
  );

  const onCancelEditMovie = useCallback(() => {
    setEnableEditMovie(false);
  }, []);

  // Controls the fade-out and unmount of the countdown animation.
  // Transition is used so it unmounts after the animation completes.
  const loadingTransitions = useTransition(loadingMovies, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // Controls fading in the movies once loaded.
  const moviesSpring = useSpring({
    opacity: !!movies ? 1 : 0,
    delay: 500,
  });

  if (lists?.length === 0) router.replace("/create");

  return (
    <>
      <PageContainer>
        {loadingTransitions(
          (styles, item) =>
            item && (
              <animated.div style={styles}>
                <Countdown />
              </animated.div>
            )
        )}

        {movies && (
          <ActionBar
            disabled={!movies || loadingMovies || movies?.length === 0}
            onAdd={onEnableAddMovie}
            onPick={onPick}
          />
        )}

        {movies && (
          <animated.div style={moviesSpring}>
            <ListGrid
              movies={movies}
              onAddMovie={onEnableAddMovie}
              onEditMovie={onEnableEditMovie}
              onRemoveMovie={onRemoveMovie}
              onMarkWatched={onMarkWatched}
            />
          </animated.div>
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
