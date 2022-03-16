import { ApolloError } from "apollo-server-errors";
import { isNil } from "lodash";

import { errorCodes } from "../../../constants/error_codes";
import { sources } from "../../../constants/sources";

export const addMovie = async (parent, { movie, list }, { db }) => {
  if (!movie.title) throw new ApolloError(errorCodes.NO_TITLE);
  if (isNil(movie.source)) movie.source = sources.NONE;
  if (isNil(movie.locked)) movie.locked = false;

  // TODO: This should be able to be updateOne with upsert and could probably be extracted to a function.
  const { result, ops } = await db.collection(list).insertOne({
    ...movie,
    addedOn: new Date().toISOString(),
    editedOn: new Date().toISOString(),
  });

  if (result.ok === 1) {
    return ops[0];
  } else {
    throw new Error(`Error adding movie: ${movie.title}`);
  }
};
