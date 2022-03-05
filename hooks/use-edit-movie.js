import { useMutation } from "@apollo/client";
import { EDIT_MOVIE } from "../graphql";

export const useEditMovie = (options = {}) => {
  const [editMovie] = useMutation(EDIT_MOVIE, {
    ...options,
  });
  return editMovie;
};
