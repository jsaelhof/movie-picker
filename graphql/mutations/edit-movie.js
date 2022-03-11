import { gql } from "@apollo/client";
import { omitTypename } from "../../utils/omit-typename";
import { omit } from "lodash";

export const EDIT_MOVIE = gql`
  mutation EditMovie(
    $movie: MovieInput!
    $list: String!
    $removeKeys: [String]
  ) {
    editMovie(movie: $movie, list: $list, removeKeys: $removeKeys) {
      id
      title
      runtime
      source
      genre
      locked
      watchedOn
    }
  }
`;

export const editMovieOptions = (movie, list) => ({
  variables: { movie: omitTypename(movie), list: list.id },
  optimisticResponse: {
    editMovie: {
      ...movie,
      __typename: "Movie",
    },
  },
});

export const markWatchedOptions = (movie, watchedOn, list) => ({
  variables: {
    movie: {
      ...omitTypename(movie),
      watchedOn,
    },
    list: list.id,
  },
  optimisticResponse: {
    editMovie: {
      ...movie,
      watchedOn,
      __typename: "Movie",
    },
  },
});

export const undoMarkWatchedOptions = (movie, list) => ({
  variables: {
    movie: omitTypename(omit(movie, "watchedOn")),
    list: list.id,
    removeKeys: ["watchedOn"],
  },
  optimisticResponse: {
    editMovie: {
      ...omit(movie, "watchedOn"),
      __typename: "Movie",
    },
  },
});
