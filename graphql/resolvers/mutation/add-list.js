import { ApolloError } from "apollo-server-errors";
import { errorCodes } from "../../../constants/error_codes";
import { v4 as uuidv4 } from "uuid";

export const addList = async (parent, { name }, { db, userId }) => {
  if (!name || name.length === 0)
    throw new ApolloError(errorCodes.NO_LIST_NAME);

  const { result: listResult, ops: listOps } = await db
    .collection("lists")
    .insertOne({
      id: uuidv4(),
      label: name,
      userId,
    });

  if (listResult?.ok) {
    return listOps[0];
  } else {
    throw new Error(`Error inserting new collection: ${name}`);
  }
};
