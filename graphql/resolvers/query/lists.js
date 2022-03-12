export const lists = async (parent, args, { db, userId }) => {
  return await db
    .collection("lists")
    .find({ userId })
    .project({ _id: 0 })
    .toArray();
};
