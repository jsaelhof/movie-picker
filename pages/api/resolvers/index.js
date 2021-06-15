import axios from "axios";
import { api } from "../../../constants/api";
import { tables } from "../../../constants/tables";

export const resolvers = {
  Query: {
    dbs: async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}${api.LOAD_DB}`
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    movies: async (parent, { db }) => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}${api.MOVIES}`.replace("%db%", db)
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    watchedMovies: async (parent, { db }) => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}${api.WATCHED_MOVIES}`.replace("%db%", db)
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    pick: async (parent, { db }) => {
      try {
        const movie = await axios.get(
          `${process.env.API_URL}${api.PICK_MOVIE}`.replace("%db%", db)
        );
        return movie.data;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    addMovie: async (parent, { movie, db }) => {
      try {
        const { data } = await axios.post(
          `${process.env.API_URL}${api.ADD_MOVIE}`.replace("%db%", db),
          movie
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    removeMovie: async (parent, { movieId, db, list }) => {
      const endpoint = {
        [tables.MOVIES]: api.DELETE_MOVIE,
        [tables.WATCHED_MOVIES]: api.DELETE_WATCHED,
      }[list];

      try {
        const { data } = await axios.post(
          `${process.env.API_URL}${endpoint}`.replace("%db%", db),
          { id: movieId }
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    markWatched: async (parent, { movie, db }) => {
      try {
        const { data } = await axios.post(
          `${process.env.API_URL}${api.MARK_WATCHED}`.replace("%db%", db),
          movie
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    undoWatched: async (parent, { movie, db }) => {
      try {
        const { data: addData } = await axios.post(
          `${process.env.API_URL}${api.ADD_MOVIE}`.replace("%db%", db),
          movie
        );

        const { data: deleteData } = await axios.post(
          `${process.env.API_URL}${api.DELETE_WATCHED}`.replace("%db%", db),
          { id: movie._id }
        );

        return addData;
      } catch (error) {
        throw error;
      }
    },
  },
};
