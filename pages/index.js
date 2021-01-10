import Head from "next/head";
import {useEffect, useState} from "react";
import List from "../components/list/list";
import Container from "@material-ui/core/Container";
import Add from "../components/add/add";
import TitleBar from "../components/titlebar/titlebar";

export default function Home() {
  const [movies, setMovies] = useState();
  const [stale, setStale] = useState(true);

  useEffect(() => {
    if (stale) {
      fetch("/api/list")
        .then((response) => response.json())
        .then((json) => {
          setStale(false);
          setMovies(json.data);
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
          pick={async () => {
            const response = await fetch("/api/pick");

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
            // TODO: This is ugly.
            // Shouldn't be inline.
            // Also maybe look at socket.io to learn that and use it to let the server push new updates?
            remove={async (id) => {
              const response = await fetch("/api/delete", {
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
          />

          <Add
            add={async (data) => {
              const response = await fetch("/api/add", {
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
