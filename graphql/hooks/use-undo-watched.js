import { gql, useMutation } from "@apollo/client";
import { GET_MOVIES } from "../queries";

const GQL = gql`
  mutation UndoMarkWatched(
    $movie: MovieInput!
    $list: String!
    $removeKeys: [String]
  ) {
    editMovie(movie: $movie, list: $list, removeKeys: $removeKeys) {
      id
      title
      list
      runtime
      source
      genre
      year
      poster
      imdbID
      locked
      addedOn
      watchedOn
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
  }
`;

export const useUndoWatched = (onCompleted) => {
  const [undoWatchedMutation, status] = useMutation(GQL, {
    onCompleted,
    update(cache, { data: { editMovie } }) {
      cache.updateQuery(
        {
          query: GET_MOVIES,
          variables: { list: editMovie.list },
        },
        ({ movies, watchedMovies }) => ({
          movies: [...movies, editMovie],
          watchedMovies: watchedMovies.filter(({ id }) => id !== editMovie.id),
        })
      );
    },
  });
  return [undoWatchedMutation, status];
};
