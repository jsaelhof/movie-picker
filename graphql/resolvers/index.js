import {
  lists,
  movies,
  searchByTitle,
  omdbMovie,
  tmdbMovie,
  tmdbProvider,
  watchedMovies,
} from "./query";
import { tmdbMovieProvider } from "./query/tmdb-movie-provider";
import {
  addList,
  addMovie,
  editMovie,
  removeMovie,
  updateMovie,
} from "./mutation";

export const resolvers = {
  Query: {
    lists,
    movies,
    watchedMovies,
    searchByTitle,
    omdbMovie,
    tmdbMovie,
  },

  TmdbMovie: {
    provider: tmdbMovieProvider,
  },

  Mutation: {
    addList,
    addMovie,
    editMovie,
    removeMovie,
    updateMovie,
  },
};
