export const watchedMovies = async (parent, { list }, { db }) => {
  return await db
    .collection(list)
    .find({ watchedOn: { $ne: null } })
    .project({ _id: 0 })
    .toArray();
};
