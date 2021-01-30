import Head from "next/head";
import {useEffect, useState} from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";

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
          onPick={async (options) => {
            const response = await axios.post(api.PICK_MOVIE, options);
            response.data.error
              ? alert("Error Picking")
              : setMovies([response.data]);
          }}
        />

        <Container>
          <List
            enableAddMovie={enableAddMovie}
            movies={movies}
            onAddingComplete={() => setEnableAddMovie(false)}
            onAddMovie={async (movie) => {
              const response = await axios.post(api.ADD_MOVIE, movie);
              if (response.data.error) {
                alert(`Error Adding ${JSON.stringify(movie)}`);
              } else {
                setStale(true);
                setToastProps({message: `Added '${movie.title}'`});
              }
            }}
            onEditMovie={async (movie) => {
              const response = await axios.post(api.ADD_MOVIE, movie);
              if (response.data.error) {
                alert(`Error Adding ${JSON.stringify(movie)}`);
              } else {
                setStale(true);
              }
            }}
            onRemoveMovie={async (id) => {
              const response = await axios.post(api.DELETE_MOVIE, {id});
              response.data.error ? alert("Error Deleting") : setStale(true);
            }}
            onMarkWatched={async (movie) => {
              const response = await axios.post(api.MARK_WATCHED, movie);
              if (response.data.error) {
                alert("Error Marking Watched");
              } else {
                setStale(true);
                setToastProps({
                  message: `Moved '${movie.title}' to watched list`,
                  onUndo: async () => {
                    const addResponse = await axios.post(api.ADD_MOVIE, movie);

                    const deleteResponse = await axios.post(
                      api.DELETE_WATCHED,
                      {id: movie._id},
                    );

                    if (addResponse.data.error || deleteResponse.data.error) {
                      alert(
                        `Error undoing move to watch list for ${JSON.stringify(
                          movie,
                        )}`,
                      );
                    } else {
                      setStale(true);
                      setToastProps({
                        message: `Moved '${movie.title}' back to movies list`,
                      });
                    }
                  },
                });
              }
            }}
          />

          <WatchedList
            movies={watchedMovies}
            onRemoveMovie={async (id) => {
              const response = await axios.post(api.DELETE_WATCHED, {id});
              response.error
                ? alert("Error Deleting From Watched List")
                : setStale(true);
            }}
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
