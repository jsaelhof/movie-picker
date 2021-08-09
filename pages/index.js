import Head from "next/head";

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Container from "@material-ui/core/Container";

import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import { randomPick } from "../utils/random-pick";
import {
  ADD_MOVIE,
  EDIT_MOVIE,
  GET_LISTS,
  GET_MOVIES,
  REMOVE_MOVIE,
} from "../graphql";
import ActionBar from "../components/action-bar/action-bar";
import ErrorDialog from "../components/error-dialog/error-dialog";
import List from "../components/list/list";
import Pick from "../components/pick/pick";
import TitleBar from "../components/titlebar/titlebar";
import Toast from "../components/toast/toast";
import WatchedList from "../components/watched-list/watched-list";

export default function Home() {
  const [list, setList] = useState();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);
  const [pick, setPick] = useState(null);
  const { lists } = useLists(setList);
  const { movies, watchedMovies, loading } = useMovies(list);

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

  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: ["GetMovies"],
  });

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    refetchQueries: ["GetMovies"],
    onError: ({ message }) => {
      setError(message);
    },
  });

  return null;

  return (
    <>
      <Head>
        <title>Movie Decider 4000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TitleBar />

        <ActionBar
          disabled={!movies || loading}
          lists={lists}
          currentList={list}
          onListChange={(value) => {
            setList(lists.find(({ id }) => id === value));
          }}
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
            <List
              enableAddMovie={enableAddMovie}
              movies={movies}
              onAddingComplete={() => setEnableAddMovie(false)}
              onAddMovie={(movie) =>
                addMovie({
                  variables: { movie: omitTypename(movie), list: list.id },
                })
              }
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
    </>
  );
}

const useLists = (onComplete) => {
  const { data } = useQuery(GET_LISTS, {
    onCompleted: ({ lists }) => {
      onComplete(lists[0]);
    },
  });

  return { ...data };
};

const useMovies = (list) => {
  const { data, refetch, loading } = useQuery(GET_MOVIES, {
    skip: !list,
    variables: { list: list?.id },
  });

  return {
    ...data,
    refetchMovies: refetch,
    loading,
  };
};
