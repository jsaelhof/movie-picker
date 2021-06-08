import Head from "next/head";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Container from "@material-ui/core/Container";
import omit from "lodash/omit";

import { api } from "../constants/api";
import { comm } from "../comm/comm";
import ActionBar from "../components/action-bar/action-bar";
import List from "../components/list/list";
import TitleBar from "../components/titlebar/titlebar";
import Toast from "../components/toast/toast";
import WatchedList from "../components/watched-list/watched-list";
import ErrorDialog from "../components/error-dialog/error-dialog";

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

const PICK = gql`
  query Pick($db: String!) {
    pick(db: $db) {
      _id
      title
      runtime
      source
      genre
    }
  }
`;

const MARK_WATCHED = gql`
  mutation MarkWatched($movie: MovieInput!) {
    markWatched(movie: $movie) {
      _id
      title
    }
  }
`;

export default function Home() {
  const [db, setDb] = useState();
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);

  const send = comm((errorMessage) => {
    setError(errorMessage);
  });

  const { dbs } = useDBs(setDb);
  const { movies, watchedMovies, refetchMovies, loading } = useMovies(db);

  const [pick, { data }] = useLazyQuery(PICK, {
    variables: { db: db?.id, noCache: Date.now() },
    fetchPolicy: "network-only",
  });
  // console.log(data?.pick.title);

  const [markWatched, { data: markWatchedData }] = useMutation(MARK_WATCHED, {
    onCompleted: ({ markWatched: movie }) => {
      console.log("On Complete", movie);
      refetchMovies(); // TODO: Does this even work? Is it even needed? It doesnt seem to cause a reftech but maybe thats the cache.
      setToastProps({
        message: `Moved '${movie.title}' to watched list`,
        onUndo: async () => {
          console.log("UNDO");
          // send(dbEndpoint(api.ADD_MOVIE), movie, () => // TODO: Replace with a mutation
          //   send(dbEndpoint(api.DELETE_WATCHED), { id: movie._id }, () => {
          //     refetchMovies(); // TODO: Same...does this even work or is it needed?
          //     setToastProps({
          //       message: `Moved '${movie.title}' back to movies list`,
          //     });
          //   })
          // );
        },
      });
    },
  });

  const dbEndpoint = (endpoint) => endpoint.replace("%db%", db.id);

  console.log(movies);

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
            //refetchMovies();
          }}
          onAdd={() => {
            setEnableAddMovie(true);
          }}
          onPick={
            (options) => pick()
            // send(dbEndpoint(api.PICK_MOVIE), options, (data) =>
            //   setMovies([data])
            // )
          }
        />

        <Container>
          {movies && (
            <List
              enableAddMovie={enableAddMovie}
              movies={movies}
              onAddingComplete={() => setEnableAddMovie(false)}
              onAddMovie={(movie) =>
                send(dbEndpoint(api.ADD_MOVIE), movie, () => {
                  refetchMovies();
                  setToastProps({ message: `Added '${movie.title}'` });
                })
              }
              onEditMovie={(movie) =>
                send(dbEndpoint(api.ADD_MOVIE), movie, () => refetchMovies())
              }
              onRemoveMovie={(id) =>
                send(dbEndpoint(api.DELETE_MOVIE), { id }, () =>
                  refetchMovies()
                )
              }
              onMarkWatched={(movie) =>
                markWatched({
                  variables: { movie: omit(movie, "__typename") },
                })
              }
            />
          )}

          {watchedMovies && (
            <WatchedList
              movies={watchedMovies}
              onRemoveMovie={(id) =>
                send(dbEndpoint(api.DELETE_WATCHED), { id }, () =>
                  refetchMovies()
                )
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
