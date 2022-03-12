export const database = async (parent, args, { db }) => {
  const name = await db.collection("lists").dbName;
  return { name };
};
