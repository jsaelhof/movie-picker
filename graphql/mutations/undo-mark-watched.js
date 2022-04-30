import { gql, useMutation } from "@apollo/client";
import { omit } from "lodash";
import { omitTypename } from "../../utils/omit-typename";
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
      background
    }
  }
`;

export const useUndoMarkWatched = ({ onCompleted }) => {
  const [undoMarkWatchedMutation, status] = useMutation(GQL, {
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
  return [undoMarkWatchedMutation, status];
};

export const undoMarkWatchedOptions = (movie, list) => ({
  variables: {
    movie: omitTypename(omit(movie, "watchedOn")),
    list: list.id,
    removeKeys: ["watchedOn"],
  },
  optimisticResponse: {
    editMovie: {
      ...movie,
      watchedOn: null,
      __typename: "Movie",
    },
  },
});
