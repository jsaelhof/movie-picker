import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../mutations";

export const useAddMovie = (onCompleted, onError) => {
  const [addMovieMutation, status] = useMutation(ADD_MOVIE, {
    onCompleted,
    onError,
  });
  return [addMovieMutation, status];
};
