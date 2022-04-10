import { ApolloError } from "apollo-server-errors";
import { isNil } from "lodash";

import { errorCodes } from "../../../constants/error_codes";
import { sources } from "../../../constants/sources";

export const addMovie = async (parent, { movie, list }, { db }) => {
  if (!movie.title) throw new ApolloError(errorCodes.NO_TITLE);
  if (isNil(movie.source)) movie.source = sources.NONE;
  if (isNil(movie.locked)) movie.locked = false;

  try {
    const record = {
      ...movie,
      addedOn: new Date().toISOString(),
      editedOn: new Date().toISOString(),
    };

    await db.collection(list).insertOne(record);

    return record;
  } catch (ex) {
    // TODO: Log this exception to Datadog?
    throw new Error(`Error adding movie: ${movie.title}`);
  }
};
