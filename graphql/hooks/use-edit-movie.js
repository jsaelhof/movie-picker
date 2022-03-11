import { useMutation } from "@apollo/client";
import { EDIT_MOVIE } from "../mutations";

export const useEditMovie = () => {
  const [editMovie, status] = useMutation(EDIT_MOVIE);
  return [editMovie, status];
};
