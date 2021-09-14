import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Container from "@material-ui/core/Container";

import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import { randomPick } from "../utils/random-pick";
import { ADD_MOVIE, EDIT_MOVIE } from "../graphql";
import { useAppContext } from "../context/app-context";
import { useRemoveMovie } from "../hooks/use-remove-movie";
import { useEditMovie } from "../hooks/use-edit-movie";
import ActionBar from "../components/action-bar/action-bar";
import AddMovieDialog from "../components/add-movie-dialog/add-movie-dialog";
import ErrorDialog from "../components/error-dialog/error-dialog";
import Pick from "../components/pick/pick";
import Toast from "../components/toast/toast";
import ListGrid from "../components/list/list-grid";

export default withPageAuthRequired(function Home() {
  const { list, setList, lists, movies, loadingMovies } = useAppContext();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [enableEditMovie, setEnableEditMovie] = useState(null);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);
  const [pick, setPick] = useState(null);

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

  const editMovie = useEditMovie();
  const removeMovie = useRemoveMovie(setError);

  return (
    <>
      <ActionBar
        disabled={!movies || loadingMovies}
        onAdd={() => {
          setEnableAddMovie(true);
        }}
        onPick={(options) => {
          try {
            setPick(randomPick(movies, options));
          } catch ({ message }) {
            setError(message);
          }
        }}
      />

      <Container>
        {pick && <Pick movie={pick} />}
        {movies && (
          <ListGrid
            movies={movies}
            onEditMovie={(movie, useEditor = true) => {
              if (useEditor) {
                setEnableEditMovie(movie);
              } else {
                editMovie({
                  variables: { movie: omitTypename(movie), list: list.id },
                });
              }
            }}
            onRemoveMovie={(id) =>
              removeMovie({
                variables: {
                  movieId: id,
                  list: list.id,
                },
              })
            }
            onMarkWatched={(movie) =>
              markWatched({
                variables: {
                  movie: {
                    ...omitTypename(movie),
                    watchedOn: new Date().toISOString(),
                  },
                  list: list.id,
                },
              })
            }
          />
        )}
      </Container>

      <Toast
        open={toastProps !== null}
        onClose={() => setToastProps(null)}
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
        <AddMovieDialog
          onAddMovie={(movie) => {
            addMovie({
              variables: { movie: omitTypename(movie), list: list.id },
            });
            setEnableAddMovie(false);
          }}
          onCancel={() => {
            setEnableAddMovie(false);
          }}
        />
      )}

      {enableEditMovie && (
        <AddMovieDialog
          movie={enableEditMovie}
          onAddMovie={(movie) => {
            editMovie({
              variables: { movie: omitTypename(movie), list: list.id },
            });
            setEnableEditMovie(false);
          }}
          onCancel={() => {
            setEnableEditMovie(false);
          }}
        />
      )}
    </>
  );
});
