import Head from "next/head";
import {useState} from "react";
import capitalize from "lodash/capitalize";
import {sourceLabels} from "../constants/sources";

const titleCase = (str) => str.split(" ").map(capitalize).join(" ");

export default function Home() {
  const [pickedMovie, setPickedMovie] = useState();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>Movie Picker</div>
        <div>
          <input
            type="button"
            value="PICK"
            onClick={async () => {
              const response = await fetch("/api/pick");
              const movie = await response.json();
              setPickedMovie(movie);
            }}
          />
        </div>

        {pickedMovie && (
          <div>
            <div>You are watching: {titleCase(pickedMovie.name)}</div>
            <div>On: {sourceLabels[pickedMovie.source]}</div>
            <div>Length: {pickedMovie.runtime}</div>
            <div>Genre: {pickedMovie.genre}</div>
          </div>
        )}
      </div>

      <style jsx>{``}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
