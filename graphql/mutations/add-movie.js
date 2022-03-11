import { gql } from "@apollo/client";
import { omitTypename } from "../../utils/omit-typename";

export const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $list: String!) {
    addMovie(movie: $movie, list: $list) {
      id
      title
      runtime
      source
      genre
      locked
    }
  }
`;

export const addMovieOptions = (movie, list) => ({
  variables: { movie: omitTypename(movie), list: list.id },
});
