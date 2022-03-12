export const movies = async (parent, { list }, { db }) => {
  return await db
    .collection(list)
    .find({ watchedOn: null })
    .project({ _id: 0 })
    .toArray();
};
