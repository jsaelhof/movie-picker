import Head from "next/head";
import {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";

import {request} from "../utils/request";
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
      request("/api/movies/list").then((response) => {
        setStale(false);
        setMovies(response.data);
      });

      request("/api/watched/list").then((response) => {
        setStale(false);
        setWatchedMovies(response.data);
      });
    }
  }, [stale]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TitleBar
          onAdd={() => {
            setEnableAddMovie(true);
          }}
          onPick={async (options) => {
            const response = await request("/api/movies/pick", options);
            response.error ? alert("Error Picking") : setMovies([response]);
          }}
        />

        <Container>
          <List
            enableAddMovie={enableAddMovie}
            movies={movies}
            onAddingComplete={() => setEnableAddMovie(false)}
            onAddMovie={async (movie) => {
              const response = await request("/api/movies/add", movie);
              if (response.error) {
                alert(`Error Adding ${JSON.stringify(movie)}`);
              } else {
                setStale(true);
                setToastProps({message: `Added '${movie.title}'`});
              }
            }}
            onRemoveMovie={async (id) => {
              const response = await request("/api/movies/delete", {id});
              response.error ? alert("Error Deleting") : setStale(true);
            }}
            onMarkWatched={async (movie) => {
              const response = await request("/api/watched", movie);
              if (response.error) {
                alert("Error Marking Watched");
              } else {
                setStale(true);
                setToastProps({
                  message: `Moved '${movie.title}' to watched list`,
                  onUndo: async () => {
                    const addResponse = await request("/api/movies/add", movie);

                    const deleteResponse = await request(
                      "/api/watched/delete",
                      {id: movie._id},
                    );

                    if (addResponse.error || deleteResponse.error) {
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
              const response = await request("/api/watched/delete", {id});
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
