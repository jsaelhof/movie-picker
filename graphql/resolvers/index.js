import {
  lists,
  movies,
  searchByTitle,
  omdbMovie,
  tmdbMovie,
  tmdbProvider,
  watchedMovies,
} from "./query";
import { addList, addMovie, editMovie, removeMovie } from "./mutation";

export const resolvers = {
  Query: {
    lists,
    movies,
    watchedMovies,
    searchByTitle,
    omdbMovie,
    tmdbMovie,
    tmdbProvider,
  },

  Mutation: {
    addList,
    addMovie,
    editMovie,
    removeMovie,
  },
};
