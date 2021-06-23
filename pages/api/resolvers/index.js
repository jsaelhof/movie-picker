import isNil from "lodash/isNil";
import omit from "lodash/omit";
import { tables } from "../../../constants/tables";
import { sources } from "../../../constants/sources";
import { ApolloError, UserInputError } from "apollo-server-errors";
import { errorCodes } from "../../../constants/error_codes";

export const resolvers = {
  Query: {
    dbs: async (parent, args, { load }) => {
      try {
        return load();
      } catch (error) {
        throw error;
      }
    },
    movies: async (parent, { db }, { query }) => {
      try {
        return query(db, tables.MOVIES);
      } catch (error) {
        throw error;
      }
    },
    watchedMovies: async (parent, { db }, { query }) => {
      try {
        return query(db, tables.WATCHED);
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    addMovie: async (parent, { movie, db }, { upsert }) => {
      try {
        if (!movie.title) throw new ApolloError(errorCodes.NO_TITLE);
        if (isNil(movie.source)) movie.source = sources.NONE;
        if (isNil(movie.locked)) movie.locked = false;
        return upsert(db, tables.MOVIES, movie);
      } catch (error) {
        throw error;
      }
    },
    removeMovie: async (parent, { movieId, db, list }, { remove }) => {
      try {
        return remove(db, list, movieId);
      } catch (error) {
        throw error;
      }
    },
    markWatched: async (parent, { movie, db }, { remove, upsert }) => {
      try {
        const data = upsert(db, tables.WATCHED, {
          ...movie,
          watched: new Date().toISOString(),
        });
        remove(db, tables.MOVIES, movie._id);
        return data;
      } catch (error) {
        throw error;
      }
    },
    undoWatched: async (parent, { movie, db }, { remove, upsert }) => {
      try {
        // Remove the watched property that gets added when the movie is marked watched.
        const data = upsert(db, tables.MOVIES, omit(movie, ["watched"]));
        remove(db, tables.WATCHED, movie._id);
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};
