import Head from "next/head";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Container from "@material-ui/core/Container";
import omit from "lodash/omit";

import { comm } from "../comm/comm";
import ActionBar from "../components/action-bar/action-bar";
import List from "../components/list/list";
import TitleBar from "../components/titlebar/titlebar";
import Toast from "../components/toast/toast";
import WatchedList from "../components/watched-list/watched-list";
import ErrorDialog from "../components/error-dialog/error-dialog";
import { tables } from "../constants/tables";
import { randomPick } from "../utils/random-pick";
import Pick from "../components/pick/pick";

const useDBs = (onComplete) => {
  const GET_DBS = gql`
    query GetDBs {
      dbs {
        id
        label
      }
    }
  `;

  const { data } = useQuery(GET_DBS, {
    onCompleted: ({ dbs }) => {
      onComplete(dbs[0]);
    },
  });

  return {
    ...data,
  };
};

const useMovies = (db) => {
  const GET_MOVIES = gql`
    query GetMovies($db: String!) {
      movies(db: $db) {
        _id
        title
        runtime
        source
        genre
        locked
      }
      watchedMovies(db: $db) {
        _id
        title
        watched
      }
    }
  `;

  const { data, refetch, loading } = useQuery(GET_MOVIES, {
    skip: !db,
    variables: { db: db?.id },
  });

  return {
    ...data,
    refetchMovies: refetch,
    loading,
  };
};

const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $db: String!) {
    addMovie(movie: $movie, db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
    }
  }
`;

const EDIT_MOVIE = gql`
  mutation EditMovie($movie: MovieInput!, $db: String!) {
    addMovie(movie: $movie, db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
    }
  }
`;

const REMOVE_MOVIE = gql`
  mutation RemoveMovie($movieId: ID!, $db: String!, $list: String!) {
    removeMovie(movieId: $movieId, db: $db, list: $list) {
      _id
    }
  }
`;

const MARK_WATCHED = gql`
  mutation MarkWatched($movie: MovieInput!, $db: String!) {
    markWatched(movie: $movie, db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
      watched
    }
  }
`;

const UNDO_WATCHED = gql`
  mutation UndoWatched($movie: MovieInput!, $db: String!) {
    undoWatched(movie: $movie, db: $db) {
      title
    }
  }
`;

export default function Home() {
  const [db, setDb] = useState();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);
  const [pick, setPick] = useState(null);

  // TODO: COMM WAS CATCHING A LOT OF ERRORS. HOW DO I DO THAT NOW?
  // const send = comm((errorMessage) => {
  //   setError(errorMessage);
  // });

  const { dbs } = useDBs(setDb);
  const { movies, watchedMovies, refetchMovies, loading } = useMovies(db);

  const [undoWatched] = useMutation(UNDO_WATCHED, {
    onCompleted: ({ undoWatched: movie }) => {
      refetchMovies(); // TODO: Same...does this even work or is it needed?
      setToastProps({
        message: `Moved '${movie.title}' back to movies list`,
      });
    },
  });

  const [markWatched, { data: markWatchedData }] = useMutation(MARK_WATCHED, {
    onCompleted: ({ markWatched: movie }) => {
      refetchMovies(); // TODO: Should the mutation return the full list? Should it insert something into the cache?
      setToastProps({
        message: `Moved '${movie.title}' to watched list`,
        onUndo: async () => {
          undoWatched({
            variables: {
              movie: omit(movie, "__typename"),
              db: db.id,
            },
          });
        },
      });
    },
  });

  const [addMovie] = useMutation(ADD_MOVIE, {
    onCompleted: ({ addMovie: movie }) => {
      refetchMovies(); // TODO: Should the mutation return the full list? Should it insert something into the cache?
      setToastProps({ message: `Added '${movie.title}'` });
    },
  });

  // TODO: Can this be replaced with ADD_MOVIE but taking in a variable about whether it's an ADD or EDIT?
  const [editMovie] = useMutation(EDIT_MOVIE, {
    onCompleted: () => {
      refetchMovies(); // TODO: Should the mutation return the full list? Should it insert something into the cache?
    },
  });

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    onCompleted: () => {
      refetchMovies(); // TODO: Should the mutation return the full list? Should it insert something into the cache?
    },
  });

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
          dbs={dbs}
          currentDb={db}
          onDBChange={(value) => {
            setDb(dbs.find(({ id }) => id === value));
          }}
          onAdd={() => {
            setEnableAddMovie(true);
          }}
          onPick={(options) => {
            try {
              setPick(randomPick(movies, options));
            } catch (ex) {
              console.log(ex);
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
                  variables: { movie: omit(movie, "__typename"), db: db.id },
                })
              }
              onEditMovie={(movie) =>
                editMovie({
                  variables: { movie: omit(movie, "__typename"), db: db.id },
                })
              }
              onRemoveMovie={(id) =>
                removeMovie({
                  variables: { movieId: id, db: db.id, list: tables.MOVIES },
                })
              }
              onMarkWatched={(movie) =>
                markWatched({
                  variables: { movie: omit(movie, "__typename"), db: db.id },
                })
              }
            />
          )}

          {watchedMovies && (
            <WatchedList
              movies={watchedMovies}
              onRemoveMovie={(id) =>
                removeMovie({
                  variables: { movieId: id, db: db.id, list: tables.WATCHED },
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
        content={error}
        onConfirm={() => setError(null)}
      />
    </>
  );
}
