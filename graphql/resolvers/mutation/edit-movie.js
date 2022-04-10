export const editMovie = async (
  parent,
  { movie, list, removeKeys },
  { db }
) => {
  const { value, ok } = await db.collection(list).findOneAndUpdate(
    {
      id: movie.id,
    },
    {
      $set: {
        ...movie,
        editedOn: new Date().toISOString(),
      },
      ...(removeKeys && {
        $unset: {
          ...removeKeys.reduce((acc, keyToRemove) => {
            acc[keyToRemove] = "";
            return acc;
          }, {}),
        },
      }),
    },
    {
      returnDocument: "after",
    }
  );

  if (ok === 1) {
    return value;
  } else {
    throw new Error(`Error marking movie watched: ${movie.title}`);
  }
};
