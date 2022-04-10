export const removeMovie = async (parent, { movieId, list }, { db }) => {
  const { deletedCount } = await db.collection(list).deleteOne({
    id: movieId,
  });

  if (deletedCount === 1) {
    return { id: movieId, list };
  } else {
    throw new Error(`Error removing movie: ${movieId}`);
  }
};
