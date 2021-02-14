import Head from "next/head";
import {useEffect, useState} from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";

import {api} from "../constants/api";
import {comm} from "../comm/comm";
import List from "../components/list/list";
import TitleBar from "../components/titlebar/titlebar";
import Toast from "../components/toast/toast";
import WatchedList from "../components/watched-list/watched-list";
import ErrorDialog from "../components/error-dialog/error-dialog";

export default function Home() {
  const [db, setDb] = useState();
  const [dbs, setDbs] = useState();
  const [movies, setMovies] = useState();
  const [watchedMovies, setWatchedMovies] = useState();
  const [stale, setStale] = useState(true);
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);

  const send = comm((errorMessage) => {
    setError(errorMessage);
  });

  const dbEndpoint = (endpoint) => endpoint.replace("%db%", db.id);

  useEffect(() => {
    if (!dbs) {
      send(api.LOAD_DB, {}, (dbs) => {
        // Default to the first dbs
        setDbs(dbs);
        setDb(dbs[0]);
      });
    } else if (db && stale) {
      axios.get(dbEndpoint(api.MOVIES)).then(({data}) => {
        setStale(false);
        setMovies(data.data);
      });

      axios.get(dbEndpoint(api.WATCHED_MOVIES)).then(({data}) => {
        setStale(false);
        setWatchedMovies(data.data);
      });
    }
  }, [dbs, db, stale]);

  return (
    <>
      <Head>
        <title>Movie Decider 4000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TitleBar
          dbs={dbs}
          currentDb={db}
          onAdd={() => {
            setEnableAddMovie(true);
          }}
          onPick={(options) =>
            send(dbEndpoint(api.PICK_MOVIE), options, (data) =>
              setMovies([data]),
            )
          }
        />

        <Container>
          <List
            enableAddMovie={enableAddMovie}
            movies={movies}
            onAddingComplete={() => setEnableAddMovie(false)}
            onAddMovie={(movie) =>
              send(dbEndpoint(api.ADD_MOVIE), movie, () => {
                setStale(true);
                setToastProps({message: `Added '${movie.title}'`});
              })
            }
            onEditMovie={(movie) =>
              send(dbEndpoint(api.ADD_MOVIE), movie, () => setStale(true))
            }
            onRemoveMovie={(id) =>
              send(dbEndpoint(api.DELETE_MOVIE), {id}, () => setStale(true))
            }
            onMarkWatched={(movie) =>
              send(dbEndpoint(api.MARK_WATCHED), movie, () => {
                setStale(true);
                setToastProps({
                  message: `Moved '${movie.title}' to watched list`,
                  onUndo: async () => {
                    send(dbEndpoint(api.ADD_MOVIE), movie, () =>
                      send(
                        dbEndpoint(api.DELETE_WATCHED),
                        {id: movie._id},
                        () => {
                          setStale(true);
                          setToastProps({
                            message: `Moved '${movie.title}' back to movies list`,
                          });
                        },
                      ),
                    );
                  },
                });
              })
            }
          />

          <WatchedList
            movies={watchedMovies}
            onRemoveMovie={(id) =>
              send(dbEndpoint(api.DELETE_WATCHED), {id}, () => setStale(true))
            }
          />
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
