import React from "react";

import { useAppContext } from "../context/app-context";
import WatchedList from "../components/watched-list/watched-list";

export default function Watched() {
  const { watchedMovies } = useAppContext();

  return watchedMovies ? <WatchedList movies={watchedMovies} /> : null;
}
