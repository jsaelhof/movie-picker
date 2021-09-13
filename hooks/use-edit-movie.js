import { useMutation } from "@apollo/client";
import { EDIT_MOVIE } from "../graphql";

export const useEditMovie = () => {
  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: ["GetMovies"],
  });

  return editMovie;
};
