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
  const [movies, setMovies] = useState();
  const [watchedMovies, setWatchedMovies] = useState();
  const [stale, setStale] = useState(true);
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [toastProps, setToastProps] = useState(null);
  const [error, setError] = useState(null);

  const send = comm((errorMessage) => {
    setError(errorMessage);
  });

  useEffect(() => {
    if (stale) {
      axios.get(api.MOVIES).then(({data}) => {
        setStale(false);
        setMovies(data.data);
      });

      axios.get(api.WATCHED_MOVIES).then(({data}) => {
        setStale(false);
        setWatchedMovies(data.data);
      });
    }
  }, [stale]);

  return (
    <>
      <Head>
        <title>Movie Decider 4000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TitleBar
          onAdd={() => {
            setEnableAddMovie(true);
          }}
          onPick={(options) =>
            send(api.PICK_MOVIE, options, (data) => setMovies([data]))
          }
        />

        <Container>
          <List
            enableAddMovie={enableAddMovie}
            movies={movies}
            onAddingComplete={() => setEnableAddMovie(false)}
            onAddMovie={(movie) =>
              send(api.ADD_MOVIE, movie, () => {
                setStale(true);
                setToastProps({message: `Added '${movie.title}'`});
              })
            }
            onEditMovie={(movie) =>
              send(api.ADD_MOVIE, movie, () => setStale(true))
            }
            onRemoveMovie={(id) =>
              send(api.DELETE_MOVIE, {id}, () => setStale(true))
            }
            onMarkWatched={(movie) =>
              send(api.MARK_WATCHED, movie, () => {
                setStale(true);
                setToastProps({
                  message: `Moved '${movie.title}' to watched list`,
                  onUndo: async () => {
                    send(api.ADD_MOVIE, movie, () =>
                      send(api.DELETE_WATCHED, {id: movie._id}, () => {
                        setStale(true);
                        setToastProps({
                          message: `Moved '${movie.title}' back to movies list`,
                        });
                      }),
                    );
                  },
                });
              })
            }
          />

          <WatchedList
            movies={watchedMovies}
            onRemoveMovie={(id) =>
              send(api.DELETE_WATCHED, {id}, () => setStale(true))
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
        open={error}
        content={error}
        onConfirm={() => setError(null)}
      />
    </>
  );
}
