import axios from "axios";
import {api} from "../../../constants/api";
import map from "lodash/map";

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({id, login, avatar_url}) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_, args) => {
      try {
        const user = await axios.get(
          `https://api.github.com/users/${args.name}`,
        );
        return {
          id: user.data.id,
          login: user.data.login,
          avatar_url: user.data.avatar_url,
        };
      } catch (error) {
        throw error;
      }
    },
    getMovies: async () => {
      try {
        const movies = await axios.get(`http://localhost:4000${api.MOVIES}`);
        return movies.data.data;
        // return map(movies.data, (movie) => ({
        //   ...movie,
        // }));
      } catch (error) {
        throw error;
      }
    },
    pick: async () => {
      try {
        const movie = await axios.get(`http://localhost:4000${api.PICK_MOVIE}`);
        console.log(movie);
        return movie.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
