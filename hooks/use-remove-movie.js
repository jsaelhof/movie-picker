import { useMutation } from "@apollo/client";
import { REMOVE_MOVIE } from "../graphql";

export const useRemoveMovie = (setError) => {
  const [removeMovie, status] = useMutation(REMOVE_MOVIE, {
    refetchQueries: ["GetMovies"],
    onError: ({ message }) => {
      setError(message);
    },
  });

  return [removeMovie, status];
};
