import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../mutations";
import { GET_MOVIES } from "../queries";

export const useAddMovie = (onCompleted, onError) => {
  const [addMovieMutation, status] = useMutation(ADD_MOVIE, {
    onCompleted,
    onError,
    update(cache, { data: { addMovie } }) {
      cache.updateQuery(
        {
          query: GET_MOVIES,
          variables: { list: addMovie.list },
        },
        ({ movies, watchedMovies }) => ({
          movies: [...movies, addMovie],
          watchedMovies,
        })
      );
    },
  });
  return [addMovieMutation, status];
};
