import { ApolloError } from "apollo-server-errors";
import { errorCodes } from "../../../constants/error_codes";
import { v4 as uuidv4 } from "uuid";

export const addList = async (parent, { name }, { db, userId }) => {
  if (!name || name.length === 0)
    throw new ApolloError(errorCodes.NO_LIST_NAME);

  try {
    const record = {
      id: uuidv4(),
      label: name,
      userId,
    };

    await db.collection("lists").insertOne(record);

    return record;
  } catch (ex) {
    // TODO: Log this error to Datadog?
    throw new Error(`Error inserting new collection: ${name}`);
  }
};
