export const removeMovie = async (parent, { movieId, list }, { db }) => {
  const { deletedCount } = await db.collection(list).deleteOne({
    id: movieId,
  });

  if (deletedCount === 1) {
    return { id: movieId };
  } else {
    throw new Error(`Error undoing movie watched: ${movieId}`);
  }
};