import axios from "axios";
import { api } from "../../../constants/api";

export const resolvers = {
  Query: {
    dbs: async () => {
      try {
        const dbs = await axios.get(`${process.env.API_URL}${api.LOAD_DB}`);
        return dbs.data;
      } catch (error) {
        throw error;
      }
    },
    movies: async (parent, { db }) => {
      try {
        const movies = await axios.get(
          `${process.env.API_URL}${api.MOVIES}`.replace("%db%", db)
        );
        return movies.data.data;
      } catch (error) {
        throw error;
      }
    },
    watchedMovies: async (parent, { db }) => {
      try {
        const movies = await axios.get(
          `${process.env.API_URL}${api.WATCHED_MOVIES}`.replace("%db%", db)
        );
        return movies.data.data;
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
    markWatched: (parent, { movie }) => movie,
  },
};
