import { gql } from "@apollo/client";
import { omitTypename } from "../../utils/omit-typename";
import { v4 as uuidv4 } from "uuid";

export const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $list: String!) {
    addMovie(movie: $movie, list: $list) {
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

export const addMovieOptions = (movie, list) => {
  const id = uuidv4();

  const movieWithId = omitTypename({
    id,
    list: list.id,
    ...movie,
    ratings: {
      ...movie.ratings,
      id,
    },
  });

  return {
    variables: { movie: movieWithId, list: list.id },
    optimisticResponse: {
      addMovie: {
        addedOn: new Date().toISOString(), // This is actually set on the server
        watchedOn: null,
        ...movieWithId,
      },
    },
  };
};
