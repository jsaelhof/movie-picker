import Head from "next/head";
import {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";

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
      fetch("/api/movies/list")
        .then((response) => response.json())
        .then((json) => {
          setStale(false);
          setMovies(json.data);
        });

      fetch("/api/watched/list")
        .then((response) => response.json())
        .then((json) => {
          setStale(false);
          setWatchedMovies(json.data);
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
            const response = await fetch("/api/movies/pick", {
              method: "post",
              body: JSON.stringify(options),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });

            if (response.status === 200) {
              const movie = await response.json();
              setMovies([movie]);
            } else {
              alert("Error Picking");
            }
          }}
        />

        <Container>
          <List
            enableAddMovie={enableAddMovie}
            movies={movies}
            onAddingComplete={() => setEnableAddMovie(false)}
            onAddMovie={async (movie) => {
              const response = await fetch("/api/movies/add", {
                method: "post",
                body: JSON.stringify(movie),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                setStale(true);
                setToastProps({message: `Added '${movie.title}'`});
              } else {
                alert(`Error Adding ${JSON.stringify(movie)}`);
              }
            }}
            onRemoveMovie={async (id) => {
              const response = await fetch("/api/movies/delete", {
                method: "post",
                body: JSON.stringify({id}),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                setStale(true);
              } else {
                alert("Error Deleting");
              }
            }}
            onMarkWatched={async (movie) => {
              const response = await fetch("/api/watched", {
                method: "post",
                body: JSON.stringify(movie),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                setStale(true);
                setToastProps({
                  message: `Moved '${movie.title}' to watched list`,
                  onUndo: async () => {
                    const addResponse = await fetch("/api/movies/add", {
                      method: "post",
                      body: JSON.stringify(movie),
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    });

                    const deleteResponse = await fetch("/api/watched/delete", {
                      method: "post",
                      body: JSON.stringify({id: movie._id}),
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    });

                    if (
                      addResponse.status === 200 &&
                      deleteResponse.status === 200
                    ) {
                      setStale(true);
                      setToastProps({
                        message: `Moved '${movie.title}' back to movies list`,
                      });
                    } else {
                      alert(
                        `Error undoing move to watch list for ${JSON.stringify(
                          movie,
                        )}`,
                      );
                    }
                  },
                });
              } else {
                alert("Error Marking Watched");
              }
            }}
          />

          <WatchedList
            movies={watchedMovies}
            onRemoveMovie={async (id) => {
              const response = await fetch("/api/watched/delete", {
                method: "post",
                body: JSON.stringify({id}),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                setStale(true);
              } else {
                alert("Error Deleting From Watched List");
              }
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
