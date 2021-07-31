import isNil from "lodash/isNil";
import random from "lodash/random";
import { sources } from "../../constants/sources";
import { ApolloError } from "apollo-server-errors";
import { errorCodes } from "../../constants/error_codes";

const id = () => random(100000000, 999999999).toString();

export const resolvers = {
  Query: {
    lists: async (parent, args, { db }) => {
      try {
        return await db
          .collection("lists")
          .find()
          .project({ _id: 0 })
          .toArray();
      } catch (error) {
        throw error;
      }
    },
    movies: async (parent, { list }, { db }) => {
      try {
        return await db
          .collection(list)
          .find({ watchedOn: null })
          .project({ _id: 0 })
          .toArray();
      } catch (error) {
        throw error;
      }
    },
    watchedMovies: async (parent, { list }, { db }) => {
      try {
        return await db
          .collection(list)
          .find({ watchedOn: { $ne: null } })
          .project({ _id: 0 })
          .toArray();
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    addMovie: async (parent, { movie, list }, { db }) => {
      try {
        if (!movie.title) throw new ApolloError(errorCodes.NO_TITLE);
        if (isNil(movie.source)) movie.source = sources.NONE;
        if (isNil(movie.locked)) movie.locked = false;

        // TODO: This should be able to be updateOne with upsert and could probably be extracted to a function.
        const { result, ops } = await db.collection(list).insertOne({
          id: id(),
          ...movie,
          addedOn: new Date().toISOString(),
          editedOn: new Date().toISOString(),
        });

        if (result.ok === 1) {
          return ops[0];
        } else {
          throw new Error(`Error adding movie: ${movie.title}`);
        }
      } catch (error) {
        throw error;
      }
    },
    editMovie: async (parent, { movie, list, removeKeys }, { db }) => {
      try {
        const { value, ok } = await db.collection(list).findOneAndUpdate(
          {
            id: movie.id,
          },
          {
            $set: {
              ...movie,
              editedOn: new Date().toISOString(),
            },
            ...(removeKeys && {
              $unset: {
                ...removeKeys.reduce((acc, keyToRemove) => {
                  acc[keyToRemove] = "";
                  return acc;
                }, {}),
              },
            }),
          }
        );

        if (ok === 1) {
          return value;
        } else {
          throw new Error(`Error marking movie watched: ${movie.title}`);
        }
      } catch (error) {
        throw error;
      }
    },
    removeMovie: async (parent, { movieId, list }, { db }) => {
      try {
        const { deletedCount } = await db.collection(list).deleteOne({
          id: movieId,
        });

        if (deletedCount === 1) {
          return { id: movieId };
        } else {
          throw new Error(`Error undoing movie watched: ${movie.title}`);
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
