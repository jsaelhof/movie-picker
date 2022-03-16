import { gql } from "@apollo/client";
import { omitTypename } from "../../utils/omit-typename";
import { v4 as uuidv4 } from "uuid";

export const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $list: String!) {
    addMovie(movie: $movie, list: $list) {
      id
      title
      runtime
      source
      genre
      locked
      list
    }
  }
`;

export const addMovieOptions = (movie, list) => {
  const movieWithId = {
    id: uuidv4(),
    list: list.id,
    ...movie,
  };

  return {
    variables: { movie: omitTypename(movieWithId), list: list.id },
    // optimisticResponse: {
    //   addMovie: {
    //     ...movieWithId,
    //   },
    // },
    refetchQueries: ["GetMovies"],
  };
};
