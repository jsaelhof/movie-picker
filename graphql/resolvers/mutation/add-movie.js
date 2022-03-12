import { ApolloError } from "apollo-server-errors";
import { errorCodes } from "../../../constants/error_codes";
import { isNil, random } from "lodash";
import { sources } from "../../../constants/sources";

// FIXME: Change this to UUID. Do a migration on the DB.
// FIXME: Once switched, this can be an argument and allow optimisticResponse
const id = () => random(100000000, 999999999).toString();

export const addMovie = async (parent, { movie, list }, { db }) => {
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
};
