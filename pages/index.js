import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import { randomPick } from "../utils/random-pick";
import { ADD_MOVIE, EDIT_MOVIE } from "../graphql";
import { useAppContext } from "../context/app-context";
import { useRemoveMovie } from "../hooks/use-remove-movie";
import { useEditMovie } from "../hooks/use-edit-movie";
import { useResponsive } from "../hooks/use-responsive";
import ActionBar from "../components/action-bar/action-bar";
import AddMovieDialog from "../components/add-movie-dialog/add-movie-dialog";
import ErrorDialog from "../components/error-dialog/error-dialog";
import Pick from "../components/pick/pick";
import Toast from "../components/toast/toast";
import ListGrid from "../components/list/list-grid";

export default withPageAuthRequired(function Home() {
  const { list, movies, loadingMovies } = useAppContext();
  const { mobile } = useResponsive();
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
      {/* In mobile, shrink the margins a bit. The zoom will be slightly smaller as well so that the card will not go off the edge  */}
      <div style={{ padding: mobile ? "0 38px" : "0 44px" }}>
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
      </div>

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
