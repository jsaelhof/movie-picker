import Head from "next/head";
import {useEffect, useState} from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import noop from "lodash/noop";

import {api} from "../constants/api";
import List from "../components/list/list";
import TitleBar from "../components/titlebar/titlebar";
import Toast from "../components/toast/toast";
import WatchedList from "../components/watched-list/watched-list";

export default function Home() {
  const [movies, setMovies] = useState();
  const [watchedMovies, setWatchedMovies] = useState();
  const [stale, setStale] = useState(true);
  const [enableAddMovie, setEnableAddMovie] = useState(false);
  const [toastProps, setToastProps] = useState(null);

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

  const send = async (endpoint, body, onSuccess = noop, errorMessage) => {
    try {
      const response = await axios.post(endpoint, body);
      onSuccess(response.data);
    } catch (err) {
      console.error(err);
      if (errorMessage) alert(errorMessage);
    }
  };

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
            send(
              api.PICK_MOVIE,
              options,
              (data) => setMovies([data]),
              "Error picking a movie",
            )
          }
        />

        <Container>
          <List
            enableAddMovie={enableAddMovie}
            movies={movies}
            onAddingComplete={() => setEnableAddMovie(false)}
            onAddMovie={(movie) =>
              send(
                api.ADD_MOVIE,
                movie,
                () => {
                  setStale(true);
                  setToastProps({message: `Added '${movie.title}'`});
                },
                `Error adding ${JSON.stringify(movie)}`,
              )
            }
            onEditMovie={(movie) =>
              send(
                api.ADD_MOVIE,
                movie,
                () => setStale(true),
                `Error editing ${JSON.stringify(movie)}`,
              )
            }
            onRemoveMovie={(id) =>
              send(
                api.DELETE_MOVIE,
                {id},
                () => setStale(true),
                `Error deleting movie`,
              )
            }
            onMarkWatched={(movie) =>
              send(api.MARK_WATCHED, movie, () => {
                setStale(true);
                setToastProps({
                  message: `Moved '${movie.title}' to watched list`,
                  onUndo: async () => {
                    const errorMessage = `Error undoing move to watch list for ${movie.title}}`;
                    send(
                      api.ADD_MOVIE,
                      movie,
                      () =>
                        send(
                          api.DELETE_WATCHED,
                          {id: movie._id},
                          () => {
                            setStale(true);
                            setToastProps({
                              message: `Moved '${movie.title}' back to movies list`,
                            });
                          },
                          errorMessage,
                        ),
                      errorMessage,
                    );
                  },
                });
              })
            }
          />

          <WatchedList
            movies={watchedMovies}
            onRemoveMovie={(id) =>
              send(
                apii.DELETE_WATCHED,
                {id},
                () => setStale(true),
                "Error deleting from watched list",
              )
            }
          />
        </Container>
      </div>

      <Toast
        open={toastProps !== null}
        onClose={() => setToastProps(null)}
        {...toastProps}
      />
    </>
  );
}
