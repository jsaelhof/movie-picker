import { gql, useMutation } from "@apollo/client";
import { omitTypename } from "../../utils/omit-typename";

const EDIT_MOVIE = gql`
  mutation EditMovie(
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

export const useEditMovie = () => {
  const [editMovie, status] = useMutation(EDIT_MOVIE);
  return [editMovie, status];
};

export const editMovieOptions = (movie, list) => ({
  variables: { movie: omitTypename(movie), list: list.id },
  optimisticResponse: {
    editMovie: {
      ...movie,
      __typename: "Movie",
    },
  },
});
