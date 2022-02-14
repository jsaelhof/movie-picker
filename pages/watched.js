import React from "react";

import { useAppContext } from "../context/app-context";
import WatchedList from "../components/watched-list/watched-list";

export default function Home() {
  const { watchedMovies } = useAppContext();

  return watchedMovies && <WatchedList />;
}
