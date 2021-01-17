import Head from "next/head";
import {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";

import Add from "../components/add/add";
import List from "../components/list/list";
import TitleBar from "../components/titlebar/titlebar";
import WatchedList from "../components/watched-list/watched-list";

export default function Home() {
  const [movies, setMovies] = useState();
  const [watchedMovies, setWatchedMovies] = useState();
  const [stale, setStale] = useState(true);

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
          pick={async (options) => {
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
            movies={movies}
            add={async (data) => {
              const response = await fetch("/api/movies/add", {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                setStale(true);
              } else {
                alert(`Error Adding ${JSON.stringify(data)}`);
              }
            }}
            // TODO: This is ugly.
            // Shouldn't be inline.
            // Also maybe look at socket.io to learn that and use it to let the server push new updates?
            remove={async (id) => {
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
            watched={async (movie) => {
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
              } else {
                alert("Error Marking Watched");
              }
            }}
          />

          <WatchedList
            movies={watchedMovies}
            // TODO: This is ugly.
            // Shouldn't be inline.
            // Also maybe look at socket.io to learn that and use it to let the server push new updates?
            remove={async (id) => {
              alert("Implement Deleting");
              // const response = await fetch("/api/watched/delete", {
              //   method: "post",
              //   body: JSON.stringify({id}),
              //   headers: {
              //     Accept: "application/json",
              //     "Content-Type": "application/json",
              //   },
              // });

              // if (response.status === 200) {
              //   setStale(true);
              // } else {
              //   alert("Error Deleting");
              // }
            }}
          />

          <Add
            add={async (data) => {
              const response = await fetch("/api/movies/add", {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                setStale(true);
              } else {
                alert(`Error Adding ${JSON.stringify(data)}`);
              }
            }}
          />
        </Container>
      </div>
    </>
  );
}
