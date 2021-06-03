import axios from "axios";
import { api } from "../../../constants/api";
import { UserInputError } from "apollo-server-errors";

export const resolvers = {
  Query: {
    getMovies: async (parent, { db }) => {
      try {
        const movies = await axios.get(
          `${process.env.API_URL}${api.MOVIES}`.replace("%db%", db)
        );
        return movies.data.data;
      } catch (error) {
        throw error;
      }
    },
    getMovie: async (parent, { db, ...args }) => {
      try {
        if (!args.title && !args.id)
          throw new UserInputError("title or id must provided");

        const movies = await axios.get(
          `${process.env.API_URL}${api.MOVIES}`.replace("%db%", db)
        );
        return movies.data.data.find(
          ({ title, _id }) => title === args.title || _id === args.id
        );
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
};
