import { useMutation, gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { map, omit } from "lodash";

import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import { ADD_MOVIE } from "../graphql";
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

const cacheFilter = (cacheList, id) =>
  cacheList.filter(({ __ref }) => __ref !== `Movie:${id}`);

const cacheInsert = (cacheList, id) =>
  cacheList.concat({ __ref: `Movie:${id}` });

export default function Home() {
  const router = useRouter();
  const { list, movies, loadingMovies, lists } = useAppContext();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [enableEditMovie, setEnableEditMovie] = useState(null);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);

  const [undoWatchedMutation] = useEditMovie({
    onCompleted: ({ editMovie: movie }) => {
      setToastProps({
        message: `Moved '${movie.title}' back to movies list`,
      });
    },
    update(cache, { data: { editMovie } }) {
      cache.modify({
        fields: {
          movies(state = []) {
            return cacheInsert(state, editMovie.id);
          },
          watchedMovies(state = []) {
            return cacheFilter(state, editMovie.id);
          },
        },
      });
    },
  });

  const [markWatchedMutation] = useEditMovie({
    onCompleted: ({ editMovie: movie }) => {
      setToastProps({
        message: `Moved '${movie.title}' to watched list`,
        onUndo: () => {
          undoWatchedMutation({
            variables: {
              movie: omitTypename(omit(movie, "watchedOn")),
              list: list.id,
              removeKeys: ["watchedOn"],
            },
            optimisticResponse: {
              editMovie: {
                ...omit(movie, "watchedOn"),
                __typename: "Movie",
              },
            },
          });
        },
      });
    },
    update(cache, { data: { editMovie } }) {
      cache.modify({
        fields: {
          movies(state = []) {
            return cacheFilter(state, editMovie.id);
          },
          watchedMovies(state = []) {
            return cacheInsert(state, editMovie.id);
          },
        },
      });
    },
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

  const [editMovieMutation] = useEditMovie();
  const [removeMovieMutation] = useRemoveMovie(setError);

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
    (movie) => {
      const watchedOn = new Date().toISOString();
      markWatchedMutation({
        variables: {
          movie: {
            ...omitTypename(movie),
            watchedOn,
          },
          list: list.id,
        },
        optimisticResponse: {
          editMovie: {
            ...movie,
            watchedOn,
            __typename: "Movie",
          },
        },
      });
    },
    [list?.id, markWatchedMutation]
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
